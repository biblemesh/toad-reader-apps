import React, { useState, useCallback, useMemo } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { StyleSheet, View, Platform } from "react-native"
import { IndexPath, Select, SelectItem } from "@ui-kitten/components"
import { v4 as uuidv4 } from 'uuid'
import { i18n } from "inline-i18n"

import Dialog from "./Dialog"
import DialogInput from "../basic/DialogInput"
import BackFunction from '../basic/BackFunction'
import SelectWebPortalWrapper from "../basic/SelectWebPortalWrapper"

import { getIdsFromAccountId } from "../../utils/toolbox"

import useClassroomInfo from "../../hooks/useClassroomInfo"
import useRouterState from "../../hooks/useRouterState"

import { createClassroom, setCurrentClassroom, setSelectedToolUid } from "../../redux/actions"

const styles = StyleSheet.create({
  container: {
    width: 320,
    maxWidth: 320,
  },
  select: {
    marginTop: 10,
  },
  webBox: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#D5D9DE",
    borderRadius: 6,
    padding: 14,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  panel: {
    position: "absolute",
    top: 54,
    left: 0,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 6,
    boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
    zIndex: 9999,
  },
  option: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  }
})

const CreateClassroom = React.memo(({
  open,
  requestHide,
  bookId,
  inEditMode,
  toggleInEditMode,

  accounts,
  books,
  userDataByBookId,

  createClassroom,
  setCurrentClassroom,
  setSelectedToolUid,
}) => {

  const { defaultClassroomUid, sortedClassrooms } = useClassroomInfo({ books, bookId, userDataByBookId })
  const { getRouterState, historyPush } = useRouterState()

  const [ name, setName ] = useState("")
  const [ basedOffUid, setBasedOffUid ] = useState(defaultClassroomUid)

  const book = books[bookId] || {}
  const accountId = Object.keys(book.accounts)[0] || ""
  const { userId } = getIdsFromAccountId(accountId)
  const { fullname, email } = accounts[accountId] || {}

  const createNewClassroom = useCallback(
    () => {
      const uid = uuidv4()

      createClassroom({
        uid,
        bookId,
        name,
        userId,
        fullname,
        email,
        based_off_classroom_uid: basedOffUid,
      })

      setCurrentClassroom({
        bookId,
        uid,
      })

      setSelectedToolUid({
        bookId,
        uid: 'FRONT MATTER',
        getRouterState,
        historyPush,
      })

      !inEditMode && toggleInEditMode()

      requestHide({ hideAll: true })
    },
    [ bookId, name, userId, fullname, email, basedOffUid, inEditMode ],
  )

  const onChangeText = useCallback(name => setName(name), [])

  const basedOffOptions = useMemo(
    () => sortedClassrooms
      .filter(({ uid, members=[] }) => {
        const myRole = (members.filter(({ user_id }) => user_id === userId)[0] || {}).role || 'STUDENT'
        return (
          !uid
          || uid === defaultClassroomUid
          || myRole === 'INSTRUCTOR'
        )
      })
      .map(({ uid, name }) => ({
        title: (
          uid === defaultClassroomUid
            ? i18n("Interactive book", "", "enhanced")
            : (
              !uid
                ? i18n("None", "", "enhanced")
                : name
            )
        ),
        uid,
      })),
    [ sortedClassrooms, defaultClassroomUid, userId ]
  )

  const onSelect = useCallback(
    ({ row: index }) => setBasedOffUid(basedOffOptions[index].uid),
    [ basedOffOptions ],
  )

  const selectedOption = basedOffOptions.filter(({ uid }) => uid === basedOffUid)[0] || { title: "" }

  return (
    <>
      {!!open && <BackFunction func={requestHide} />}
      <Dialog
        open={!!open}
        type="confirm"
        title={i18n("Create a new classroom", "", "enhanced")}
        message={
          <View style={styles.container}>
            <DialogInput
              value={name}
              onChangeText={onChangeText}
              label={i18n("Classroom name", "", "enhanced")}
              placeholder={i18n("Eg. Fall 2020", "", "enhanced")}
            />

            {Platform.OS === "web" ? (
              <SelectWebPortalWrapper
                label={i18n("Based off...", "", "enhanced")}
                value={selectedOption.title}
                options={basedOffOptions}
                onSelect={(opt) => setBasedOffUid(opt.uid)}
              />
            ) : (
              <Select
                label={i18n("Based off...", "", "enhanced")}
                style={styles.select}
                value={selectedOption.title}
                selectedIndex={new IndexPath(basedOffOptions.indexOf(selectedOption))}
                onSelect={onSelect}
              >
                {basedOffOptions.map(({ title }, idx) => (
                  <SelectItem key={idx} title={title} />
                ))}
              </Select>
            )}
          </View>
        }
        confirmButtonText={i18n("Create", "", "enhanced")}
        confirmButtonStatus="primary"
        onCancel={requestHide}
        onConfirm={createNewClassroom}
      />
    </>
  )
})

const mapStateToProps = ({ accounts, books, userDataByBookId }) => ({
  accounts,
  books,
  userDataByBookId,
})

const matchDispatchToProps = (dispatch, x) => bindActionCreators({
  createClassroom,
  setCurrentClassroom,
  setSelectedToolUid,
}, dispatch)

export default connect(mapStateToProps, matchDispatchToProps)(CreateClassroom)