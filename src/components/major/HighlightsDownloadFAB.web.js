import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { createPortal } from 'react-dom';
import { i18n } from 'inline-i18n';
import { jsPDF } from 'jspdf';
import '../../utils/Roboto-Regular-normal';

import { combineItems } from '../../utils/toolbox';
import FAB from '../basic/FAB.native';

const MAX_EXPORT_QUOTE_CHARACTER_LENGTH = 100;

function generateCSV(rows) {
  return rows
    .map((row) =>
      row
        .map((col) => {
          if (col == null) return '';
          const value = col.toString().replace(/"/g, '""');
          return `"${value}"`;
        })
        .join(','),
    )
    .join('\n');
}

const HighlightsDownloadFAB = React.memo(
  ({ filename, highlightGroupsToShow, spineLabelsByIdRef, bookUrl }) => {
    const [showOptions, setShowOptions] = useState(false);
    const fabRef = useRef(null);
    const [dropdownRect, setDropdownRect] = useState(null);

    const toggleShowOptions = () => {
      if (!showOptions && fabRef.current) {
        const rect = fabRef.current.getBoundingClientRect();
        setDropdownRect(rect);
      }
      setShowOptions((prev) => !prev);
    };

    const csvData = useMemo(() => {
      const csvData = [
        [
          i18n('Chapter', '', 'enhanced'),
          i18n('Location', '', 'enhanced'),
          i18n('Highlight snippet', '', 'enhanced'),
          i18n('Highlighter', '', 'enhanced'),
          i18n('My notes', '', 'enhanced'),
          i18n('Instructor’s Notes', '', 'enhanced'),
        ],
      ];

      highlightGroupsToShow.forEach((highlightGroupToShow) => {
        highlightGroupToShow.highlights.forEach(
          ({ cfi, text, types, notes, instructorHighlightersWithoutNotes }) => {
            const latestLocation = {
              spineIdRef: highlightGroupToShow.spineIdRef,
              cfi,
            };

            text = text || '';
            if (text.length > MAX_EXPORT_QUOTE_CHARACTER_LENGTH) {
              text = `${text.substr(0, MAX_EXPORT_QUOTE_CHARACTER_LENGTH - 3)}...`;
            }

            csvData.push(
              [
                spineLabelsByIdRef[highlightGroupToShow.spineIdRef] || '',
                `${bookUrl}#{"latestLocation":${JSON.stringify(latestLocation)}}`,
                text,
                combineItems(
                  ...(!types.includes('user')
                    ? []
                    : [i18n('Me', '', 'enhanced')]),
                  ...notes
                    .map(({ author_fullname }) => author_fullname)
                    .filter(Boolean),
                  ...instructorHighlightersWithoutNotes,
                ),
                (
                  notes.filter(({ author_fullname }) => !author_fullname)[0] ||
                  {}
                ).note || '',
                notes
                  .filter(({ author_fullname }) => author_fullname)
                  .map(({ note }) => note)
                  .join('\n\n'),
              ].map((col) => col.replace(/"/g, '""')),
            );
          },
        );
      });

      return csvData;
    }, [highlightGroupsToShow, bookUrl]);

    const downloadCSV = () => {
      const csvString = generateCSV(csvData);
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.csv`;
      a.click();

      URL.revokeObjectURL(url);
      setShowOptions(false);
    };

    // ----------- PDF DOWNLOAD -----------
    const downloadPDF = () => {
      const doc = new jsPDF({ format: 'letter', unit: 'in' });
      doc.setFont('Roboto-Regular');

      let y = 1;
      const pageHeight = 11;
      const left = 0.5;

      // ----------- MAIN TITLE -----------
      doc.setFontSize(20);
      doc.text(`Highlights - ${filename}`, left, y);
      y += 0.5;

      highlightGroupsToShow.forEach(({ spineIdRef, highlights }) => {
        // ----------- SECTION TITLE -----------
        doc.setFontSize(14);
        doc.setTextColor(120, 120, 120); // light gray
        doc.text(spineLabelsByIdRef[spineIdRef] || '', left, y);
        y += 0.35;

        highlights.forEach(({ text, types, notes }) => {
          // ---------- MINE LABEL ----------
          if (types.includes('user')) {
            const label = 'Mine';

            doc.setFontSize(9); // smaller, closer to prod
            const { w, h } = doc.getTextDimensions(label);

            const padX = 0.08;
            const padY = 0.03;

            // PROD-LIKE COLOR: soft grey-blue
            doc.setFillColor(215, 222, 235);
            doc.setDrawColor(215, 222, 235);
            doc.setLineWidth(0);

            // Slightly rounded rectangle
            doc.roundedRect(
              left,
              y - h + padY,
              w + padX * 2,
              h + padY * 2,
              0.03, // corner radius
              0.03,
              'F',
            );

            doc.setTextColor(0, 0, 0);
            doc.text(label, left + padX, y + padY);

            // Add spacing between Mine label and highlight text
            y += 0.28; // more space than before (prod-like)
          }

          // ---------- QUOTATION MARK ----------
          doc.setFontSize(40);
          doc.text('“', left, y + 0.35);
          const quoteWidth = doc.getTextDimensions('“').w;

          // ---------- HIGHLIGHT TEXT ----------
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0);

          const wrapWidth = 7.5 - (left + quoteWidth + 0.1); // page width - margins
          const wrappedText = doc.splitTextToSize(
            text || i18n('(Highlighted text unavailable.)'),
            wrapWidth,
          );

          wrappedText.forEach((line) => {
            doc.text(line, left + quoteWidth + 0.1, y);
            y += 0.22;
          });

          y += 0.1;

          // ---------- NOTES ----------
          if (notes.length > 0) {
            notes.forEach((n) => {
              doc.setFontSize(10);
              doc.setTextColor(40, 40, 40);

              const noteWrap = doc.splitTextToSize(n.note, 6.8);
              noteWrap.forEach((line) => {
                doc.text(`- ${line}`, left + quoteWidth + 0.1, y);
                y += 0.18;
              });

              if (n.author_fullname) {
                doc.setFontSize(9);
                doc.setTextColor(100, 100, 100);
                doc.text(n.author_fullname, left + quoteWidth + 0.15, y);
                y += 0.22;
              }
            });

            y += 0.1;
          }

          // ---------- PAGE BREAK ----------
          if (y > pageHeight - 1) {
            doc.addPage();
            y = 1;
          }
        });

        y += 0.3;
      });

      doc.save(`${filename}.pdf`);
      setShowOptions(false);
    };

    // ----------- Outside Click Listener -----------
    useEffect(() => {
      if (!showOptions) return;

      const handleClick = (e) => {
        if (
          fabRef.current &&
          !fabRef.current.contains(e.target) &&
          !document.querySelector('[data-fab-dropdown]')?.contains(e.target)
        ) {
          setShowOptions(false);
        }
      };

      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [showOptions]);

    if (Platform.OS !== 'web') return null;

    // ---------------- RENDER ----------------
    return (
      <>
        {/* Floating FAB */}
        <div
          ref={fabRef}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 9999,
            width: '56px',
            height: '56px',
          }}
        >
          <FAB
            iconName="cloud-download"
            status="primary"
            onPress={toggleShowOptions}
            style={{
              width: '56px',
              height: '56px',
            }}
          />
        </div>

        {/* Dropdown */}
        {showOptions &&
          dropdownRect &&
          createPortal(
            <div
              data-fab-dropdown
              style={{
                position: 'fixed',
                top: dropdownRect.top - 8 - 60,
                left: dropdownRect.right - 180,
                backgroundColor: '#fff',
                border: '1px solid rgba(0,0,0,0.15)',
                borderRadius: 6,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 10000,
                minWidth: 180,
              }}
            >
              <div
                onClick={downloadCSV}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                }}
              >
                {i18n('Spreadsheet (csv)')}
              </div>

              <div
                onClick={downloadPDF}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                }}
              >
                {i18n('Document (pdf)')}
              </div>
            </div>,
            document.body,
          )}
      </>
    );
  },
);

export default HighlightsDownloadFAB;
