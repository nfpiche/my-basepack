import React from 'react';
import styles from './main.css';

const Main = () => (
  <div data-testid="hello-world" className={styles.helloWorldContainer}>
    Hello world: {GLOBAL.DOTENV}
  </div>
);

export default Main;
