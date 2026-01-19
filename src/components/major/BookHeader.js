import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Platform, Alert } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { OverflowMenu, MenuItem } from "@ui-kitten/components"
import { i18n } from "inline-i18n"
import useToggle from "react-use/lib/useToggle"
import { createPortal } from "react-dom"

import useNetwork from "../../hooks/useNetwork"
import useWideMode from "../../hooks/useWideMode"
import useClassroomInfo from "../../hooks/useClassroomInfo"
import useRouterState from "../../hooks/useRouterState"
import { removeFromBookDownloadQueue, setDownloadStatus, clearTocAndSpines, clearUserDataExceptProgress, toggleSidePanelOpen, setSelectedToolUid } from "../../redux/actions"
import { removeEpub } from "../../utils/removeEpub"
import { getFirstBookLinkInfo, openURL } from "../../utils/toolbox"
import { logEvent } from "../../utils/analytics"

import AppHeader from "../basic/AppHeader"
import HeaderIcon from "../basic/HeaderIcon"
import SaveStateHeaderIcon from "../basic/SaveStateHeaderIcon"

const styles = StyleSheet.create({
  optionsMenu: {
    width: 225,
  },
  libraryIcon: {
    width: 25,
  },
})

const BookHeader = React.memo(({
  bookId,
  title,
  subtitle,
  mode,
  showDisplaySettings,
  onLibraryPress,
  setModeToPage,
  toggleShowSearch,

  books,
  userDataByBookId,
  sidePanelSettings,

  removeFromBookDownloadQueue,
  setDownloadStatus,
  clearTocAndSpines,
  clearUserDataExceptProgress,
  toggleSidePanelOpen,
  setSelectedToolUid,
}) => {

  const [ showOptions, toggleShowOptions ] = useToggle(false)

  const wideMode = useWideMode()

  const { online } = useNetwork()

  const { book, canViewDashboard } = useClassroomInfo({ books, bookId, userDataByBookId })

  const bookLinkInfo = getFirstBookLinkInfo(book)

  const { historyGo, historyPush, getRouterState } = useRouterState()

  const anchorRef = useRef(null)
  const menuRef = useRef(null)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (Platform.OS === "web" && showOptions && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect()
      setMenuPos({
        top: rect.bottom + 8,
        left: rect.right - 220,
      })
    }
  }, [showOptions])

  useEffect(() => {
    if (Platform.OS !== "web") return;
    if (!showOptions) return;
  
    const anchor = anchorRef.current;
    const menu = menuRef.current;
  
    const handlePointerDownCapture = (e) => {
      // All clicks, including those on React Native Web components, will be captured here
      const path = e.composedPath ? e.composedPath() : [];
  
      const insideMenu = menu && path.includes(menu);
      const insideAnchor = anchor && path.includes(anchor);
  
      if (!insideMenu && !insideAnchor) {
        toggleShowOptions(false);
      }
    };
  
    // Listen at the top level using capture mode
    document.addEventListener("pointerdown", handlePointerDownCapture, true);
  
    return () => {
      document.removeEventListener("pointerdown", handlePointerDownCapture, true);
    };
  }, [showOptions]);
    
  

  const goToBookLink = useCallback(
    () => {
      const bookLinkInfo = getFirstBookLinkInfo(book)
      openURL({ url: bookLinkInfo.href, newTab: true, historyPush })
    },
    [ book ],
  )

  const removeFromDevice = useCallback(
    () => {
      Alert.alert(
        i18n("Remove from device"),
        i18n("Are you sure you want to remove “{{book_title}}” from this device?", {
          book_title: books[bookId].title,
        }),
        [
          {
            text: i18n("Cancel"),
            style: 'cancel',
          },
          {
            text: i18n("Remove"),
            onPress: async () => {
              await removeEpub({
                bookId,
                removeFromBookDownloadQueue,
                setDownloadStatus,
                clearTocAndSpines,
                clearUserDataExceptProgress,
              })

              historyGo(-2)

              logEvent({
                eventName: `Remove book`,
                properties: {
                  title: books[bookId].title || `Book id: ${bookId}`,
                  type: `ebook`,
                },
              })
            },
            // style: 'destructive',
          },
        ],
        { cancelable: false }
      )
    },
    [ books, bookId ],
  )

  const goToHighlights = useCallback(
    () => {
      if(canViewDashboard) {
        setSelectedToolUid({
          bookId,
          uid: 'DASHBOARD',
          getRouterState: () => ({
            ...getRouterState(),
            initialSelectedTabId: 'highlights',
          }),
          historyPush,
        })

      } else {
        setSelectedToolUid({
          bookId,
          uid: 'HIGHLIGHTS',
          getRouterState,
          historyPush,
        })
      }

      setModeToPage && setTimeout(setModeToPage)
    },
    [ bookId, canViewDashboard ],
  )

  const moreOptions = [
    {
      title: i18n("My highlights and notes"),
      onPress: goToHighlights,
    },
    // {
    //   title: i18n("Recommend this book"),
    //   onPress: recommendBook,
    // },
    ...(!bookLinkInfo ? [] : [{
      title: bookLinkInfo.label,
      onPress: goToBookLink,
    }]),
    ...(Platform.OS === 'web' ? [] : [{
      title: i18n("Remove from device"),
      onPress: removeFromDevice,
    }]),
  ]

  const selectOption = useCallback(
    ({ row: selectedIndex }) => {
      const { onPress } = moreOptions[selectedIndex]
      if(onPress) {
        onPress()
        toggleShowOptions(false)
      }
    },
    [ bookLinkInfo, goToBookLink, removeFromDevice ],
  )

  const searchUnavailable = (
    Platform.OS === 'web'
    && !online
  )

  const rightControls = [
    <SaveStateHeaderIcon key="save" />,

    ...(wideMode ? [
      <HeaderIcon
        key="search"
        iconName="search-sharp"
        onPress={toggleShowSearch}
        disabled={searchUnavailable}
        uiStatus={searchUnavailable ? "disabled" : "faded"}
      />,
    ] : []),

    <HeaderIcon
      key="display"
      iconName="format-size"
      iconPack="materialCommunity"
      onPress={showDisplaySettings}
      uiStatus={wideMode ? "faded" : null}
    />,

    ...(Platform.OS === "web"
      ? [
          <HeaderIcon
            key="more-web"
            ref={anchorRef}
            iconName="dots-vertical"
            iconPack="materialCommunity"
            onPress={toggleShowOptions}
            uiStatus={wideMode ? "faded" : null}
          />,
        ]
      : [
          <OverflowMenu
            key="more-native"
            visible={showOptions}
            onSelect={selectOption}
            onBackdropPress={toggleShowOptions}
            placement="bottom end"
            style={styles.optionsMenu}
            anchor={() => (
              <HeaderIcon
                iconName="dots-vertical"
                iconPack="materialCommunity"
                onPress={toggleShowOptions}
                uiStatus={wideMode ? "faded" : null}
              />
            )}
          >
            {moreOptions.map(({ title }, idx) => (
              <MenuItem key={idx} title={title} />
            ))}
          </OverflowMenu>
    // ...(!(wideMode && Platform.OS !== 'web') ? [] : [
    //   <HeaderIcon
    //     iconName="apps"
    //     onPress={togglePageBrowser}
    //     uiStatus="faded"
    //   />
    // ]),
        ]),

    ...(wideMode ? [
      <HeaderIcon
        key="sidepanel"
        iconName="reader-sharp"
        onPress={toggleSidePanelOpen}
        uiStatus={sidePanelSettings.open ? null : "faded"}
      />
    ] : []),
  ]

  const leftControl = useMemo(
    () => (
      <HeaderIcon
        iconPack="image"
        iconStyle={styles.libraryIcon}
        onPress={onLibraryPress}
        uiStatus={wideMode ? "faded" : null}
        iconName={require("../../../assets/library.png")}
      />
    ),
    [wideMode]
  )

  return (
    <>
      <AppHeader
        hide={mode === 'page' && !wideMode}
        title={title}
        subtitle={subtitle}
        titleCentered
        leftControl={leftControl}
        rightControls={rightControls}
        uiStatus={wideMode ? "faded" : null}
      />

      {/* Temporary UI Kitten fix. This will be removed once UI Kitten is fully replaced.  */}
      {Platform.OS === "web" && showOptions &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              top: menuPos.top,
              left: menuPos.left,
              backgroundColor: "#fff",
              borderRadius: 8,
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              zIndex: 999999,
              width: 220,
            }}
          >
            {moreOptions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  item.onPress?.()
                  toggleShowOptions(false)
                }}
                style={{
                  fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                  padding: "12px 16px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {item.title}
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  )
})

const mapStateToProps = ({ books, userDataByBookId, sidePanelSettings }) => ({
  books,
  userDataByBookId,
  sidePanelSettings,
})

const matchDispatchToProps = (dispatch, x) => bindActionCreators({
  removeFromBookDownloadQueue,
  setDownloadStatus,
  clearTocAndSpines,
  clearUserDataExceptProgress,
  toggleSidePanelOpen,
  setSelectedToolUid,
}, dispatch)

export default connect(mapStateToProps, matchDispatchToProps)(BookHeader)