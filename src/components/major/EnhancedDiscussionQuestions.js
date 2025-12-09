import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { i18n } from 'inline-i18n';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import usePrevious from 'react-use/lib/usePrevious';
import WebDropdown from '../basic/WebDropdown';

import getDummyDiscussionQuestions from '../../utils/getDummyDiscussionQuestions';
import {
  orderSpineIdRefKeyedObj,
  orderCfiKeyedObj,
  combineItems,
} from '../../utils/toolbox';
import useClassroomInfo from '../../hooks/useClassroomInfo';
import useWideMode from '../../hooks/useWideMode';

import DiscussionQuestionTool from './DiscussionQuestionTool';

const selectContainer = {
  width: 800,
  maxWidth: '100%',
  paddingHorizontal: 20,
};

const styles = StyleSheet.create({
  none: {
    textAlign: 'center',
    paddingTop: 50,
    fontSize: 16,
    fontWeight: '100',
  },
  genericContainer: {
    marginVertical: 20,
    marginHorizontal: 30,
    flex: 1,
  },
  container: {
    marginTop: 20,
    flex: 1,
  },
  selectContainer: {
    ...selectContainer,
  },
  selectContainerWideMode: {
    ...selectContainer,
    paddingHorizontal: 30,
  },
  discussionsContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
  },
  discussionContainer: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(0, 0, 0, .15)',
    flex: 1,
  },
  discussionContainerLast: {
    flex: 1,
  },
});

const EnhancedDiscussionQuestions = React.memo(
  ({ bookId, logToolUsageEvent, books, userDataByBookId }) => {
    const { classroomUid, visibleTools, spines } = useClassroomInfo({
      books,
      bookId,
      userDataByBookId,
      inEditMode: false,
    });

    const wideMode = useWideMode();

    const { orderedQuestions } = useMemo(() => {
      const out = [];
      const byLoc = {};

      visibleTools.forEach((tool) => {
        const { uid, spineIdRef, cfi, name, data } = tool;
        if (!data.isDiscussion) return;

        const key = cfi || 'NULL';
        byLoc[spineIdRef] ??= {};
        byLoc[spineIdRef][key] ??= [];

        byLoc[spineIdRef][key].push({
          uid,
          name,
          question: data.question || '',
          title: name || i18n('Question', '', 'enhanced'),
        });
      });

      orderSpineIdRefKeyedObj({ obj: byLoc, spines }).forEach((group) => {
        orderCfiKeyedObj({ obj: group }).forEach((items) => {
          items.forEach((q) => out.push(q));
        });
      });

      if (out.length === 0) return getDummyDiscussionQuestions();
      return { orderedQuestions: out };
    }, [visibleTools, spines]);

    const [uids, setUids] = useState([]);
    const prevUids = usePrevious(uids);
    const selectedObjects = orderedQuestions.filter((q) =>
      uids.includes(q.uid),
    );

    const handleSelectNative = useCallback(
      (info) => {
        if (wideMode) {
          const rows = info.map((i) => i.row);
          setUids(rows.map((r) => orderedQuestions[r].uid).slice(-3));
        } else {
          setUids([orderedQuestions[info.row].uid]);
        }
      },
      [orderedQuestions, wideMode],
    );

    const handleSelectWeb = useCallback(
      (row) => {
        const uid = orderedQuestions[row].uid;

        setUids((prev) => {
          const exists = prev.includes(uid);

          if (wideMode) {
            const next = exists
              ? prev.filter((id) => id !== uid)
              : [...prev, uid];

            return next.slice(-3); // max 3 item
          }

          return [uid]; // mobile/web-narrow: single select
        });
      },
      [orderedQuestions, wideMode],
    );

    useEffect(() => {
      if (!uids || uids.length === 0) return;
      if (!prevUids) return;

      uids.forEach((id) => {
        if (!prevUids.includes(id)) {
          logToolUsageEvent({ toolUid: id, eventName: 'View tool' });
        }
      });
    }, [uids, prevUids, logToolUsageEvent]);

    if (!classroomUid) return null;

    const shownQuestions = wideMode
      ? selectedObjects
      : selectedObjects.slice(0, 1);

    const memoQuestions = useMemo(
      () => orderedQuestions,
      [orderedQuestions.length],
    );

    return (
      <View style={styles.container}>
        <View
          style={
            wideMode ? styles.selectContainerWideMode : styles.selectContainer
          }
        >
          {Platform.OS === 'web' ? (
            <WebDropdown
              label={
                wideMode
                  ? i18n('Questions to display', '', 'enhanced')
                  : i18n('Question', '', 'enhanced')
              }
              placeholder={
                wideMode
                  ? i18n('Select up to three', '', 'enhanced')
                  : i18n('Select a question', '', 'enhanced')
              }
              orderedQuestions={memoQuestions}
              selectedObjects={selectedObjects}
              onSelectRow={handleSelectWeb}
            />
          ) : (
            <Select
              label={
                wideMode
                  ? i18n('Questions to display', '', 'enhanced')
                  : i18n('Question', '', 'enhanced')
              }
              placeholder={
                wideMode
                  ? i18n('Select up to three', '', 'enhanced')
                  : i18n('Select a question', '', 'enhanced')
              }
              multiSelect={wideMode}
              value={
                wideMode
                  ? combineItems(...selectedObjects.map((x) => x.title))
                  : selectedObjects?.[0]?.title
              }
              selectedIndex={
                wideMode
                  ? selectedObjects.map(
                      (x) => new IndexPath(orderedQuestions.indexOf(x)),
                    )
                  : selectedObjects[0]
                    ? new IndexPath(
                        orderedQuestions.indexOf(selectedObjects[0]),
                      )
                    : undefined
              }
              onSelect={handleSelectNative}
            >
              {orderedQuestions.map(({ title }, idx) => (
                <SelectItem key={idx} title={title} />
              ))}
            </Select>
          )}
        </View>

        <View style={styles.discussionsContainer}>
          {shownQuestions.map(({ uid, question }, idx) => (
            <View
              key={uid}
              style={
                idx === shownQuestions.length - 1
                  ? styles.discussionContainerLast
                  : styles.discussionContainer
              }
            >
              <DiscussionQuestionTool
                bookId={bookId}
                toolUid={uid}
                question={question}
                extraKeyboardVerticalOffset={92}
                logUsageEvent={logToolUsageEvent}
              />
            </View>
          ))}
        </View>
      </View>
    );
  },
);

const mapStateToProps = ({ books, userDataByBookId }) => ({
  books,
  userDataByBookId,
});

export default connect(mapStateToProps)(EnhancedDiscussionQuestions);
