// Libs
import {format} from 'date-fns';
import {de} from 'date-fns/locale';
import dayjs from 'dayjs';

// Utils
import {calculateLogTime, millisecondsToMinutes} from 'utils';

// Types
import {TimeLog} from 'types/models/time-log';
import {ReportTemplateParams} from './types';

export const renderReportTemplate = (params: ReportTemplateParams): string => {
  return /*html*/ `
  <html>
    <head>
      <style>
        ${style}
      </style>
    </head>
    <body>
      <h2>${params.title}</h2>
      <p>
        <strong>Period from:</strong> 
        ${displayDate(params.fromDate)} <strong>to:</strong> ${displayDate(params.toDate)}
      </p>

      ${renderTable(params.logs)}

      <p>
        <strong>Generated for:</strong> ${params.generatedFor}
      </p>

      <footer>
        <b>Report generated</b> on: ${displayDate(params.generatedDate)}
      </footer>
    </body>
  </html>
  `;
};

const displayDate = (date: number | Date): string => format(date, 'dd.MM.yyyy', {locale: de});

const displayTime = (date?: number): string => {
  if (!date) return '-';
  return dayjs(date).format('HH:mm');
};

const displayTotalLogTime = (log: TimeLog): string => {
  const {hours, minutes} = calculateLogTime(log);
  let text = '';

  if (hours > 0) {
    text = `${hours} h`;
  }

  if (minutes > 0) {
    text = text.concat(` ${minutes} min`);
  }

  return text;
};

const displayPause = (pause: number): string => {
  return pause > 0 ? `${millisecondsToMinutes(pause)} min` : '-';
};

const renderTable = (logs: ReportTemplateParams['logs']): string => `
  <table>
    <tr>
      <th>Logged Date</th>
      <th>From</th>
      <th>To</th>
      <th>Pause</th>
      <th>Logged Time</th>
      <th>Notes</th>
    </tr>

    ${logs
      ?.map(
        log => `
        <tr>
          <td>${displayDate(log.loggedDate)}</td>
          <td>${displayTime(log.fromTime)}</td>
          <td>${displayTime(log.toTime)}</td>
          <td>${displayPause(log.pause)}</td>
          <td>${displayTotalLogTime(log)}</td>
          <td>${log.notes}</td>
        </tr>
    `,
      )
      .join('')}
  </table>
`;

const style: string = `
  body {
    background-color: #f0f2f5;
    padding: 16px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #ffffff;
    margin-top: 16px;
  }

  table th {
    background-color: #fafcfd;
  }

  table, th, td {
    border: 1px solid #e5e5e5;
  }

  th, td {
    padding: 8px;
    text-align: left;
  }

  /* Set specific column widths */

  /* Logged Date */
  th:first-child,
  td:first-child {
    min-width: 120px;
  }

  /* From and To */
  th:nth-child(2),
  td:nth-child(2),
  th:nth-child(3),
  td:nth-child(3) {
    min-width: 100px;
  }

  /* Pause */
  th:nth-child(4),
  td:nth-child(4) {
    min-width: 80px;
  }

  /* Logged Time */
  th:nth-child(5),
  td:nth-child(5) {
    min-width: 100px;
  }

  /* Notes */
  th:nth-child(6),
  td:nth-child(6) {
    min-width: 120px;
    max-width: 180px;
    overflow: hidden;
    word-wrap: break-word;
    white-space: normal;
    text-overflow: ellipsis;
  }

  /* Footer */
  footer {
    margin-top: 20px;
    text-align: right;
    font-style: italic;
  }
`;
