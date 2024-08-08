'use client'

import React, { useState, useEffect } from 'react';
import styles from './finance.module.css'; // Import CSS module

interface TimeSeries {
  [key: string]: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. adjusted close': string;
    '6. volume': string;
  };
}

interface ApiResponse {
  'Time Series (Daily)': TimeSeries;
}

const FinancePage: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          setData(JSON.parse(this.responseText));
        }
      });

      xhr.open(
        'GET',
        'https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&outputsize=compact&datatype=json'
      );
      xhr.setRequestHeader(
        'x-rapidapi-key',
        '0886f83e0emsh88d80c78653d6f9p169fd6jsn2c8d9ab8a3e7'
      );
      xhr.setRequestHeader(
        'x-rapidapi-host',
        'alpha-vantage.p.rapidapi.com'
      );
      xhr.send(null);
    };

    fetchData();
  }, []);

  if (!data || !data['Time Series (Daily)']) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <h1 className={styles.title}>Microsoft (MSFT) Stock Data</h1>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Adjusted Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data['Time Series (Daily)']).map((date) => (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{data['Time Series (Daily)'][date]['1. open']}</td>
                  <td>{data['Time Series (Daily)'][date]['2. high']}</td>
                  <td>{data['Time Series (Daily)'][date]['3. low']}</td>
                  <td>{data['Time Series (Daily)'][date]['4. close']}</td>
                  <td>{data['Time Series (Daily)'][date]['5. adjusted close']}</td>
                  <td>{data['Time Series (Daily)'][date]['6. volume']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;
