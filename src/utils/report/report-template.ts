// Libs
import {format} from 'date-fns';
import {de} from 'date-fns/locale';

// Types
import {ReportTemplateParams} from './types';

export const renderReportTemplate = (params: ReportTemplateParams): string => {
  return /*html*/ `
  <html>
    <head>
      ${style}
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

const renderTable = (logs: ReportTemplateParams['logs']): string => `
  <table>
    <tr>
      <th>Logged Date</th>
      <th>Logged Time</th>
      <th>Notes</th>
    </tr>

    ${logs
      ?.map(
        log => `
        <tr>
          <td>${displayDate(log.loggedDate)}</td>
          <td>${log.loggedTime} hours</td>
          <td>${log.notes}</td>
        </tr>
    `,
      )
      .join('')}
  </table>
`;

const displayDate = (date: number | Date): string => format(date, 'dd.MM.yyyy', {locale: de});

const style: string = `
  <style>
    body {
      background-color: #f0f2f5;
      padding: 16px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background-color: #ffffff;
    }

    table th {
      background-color: #fafcfd;
    }

    table,
    th,
    td {
      border: 1px solid #e5e5e5;
    }

    th,
    td {
      padding: 8px;
      text-align: left;
    }

    /* Set specific column widths */

    /* Logged Date */
    th:first-child,
    td:first-child {
      min-width: 120px;
    }

    /* Logged Time */
    th:nth-child(2),
    td:nth-child(2) {
      min-width: 100px;
    }

    /* Notes */
    th:nth-child(3),
    td:nth-child(3) {
      min-width: 120px;
      max-width: 180px;
    }

    /* Footer */
    footer {
      margin-top: 20px;
      text-align: right;
      font-style: italic;
    }
  </style>
`;
