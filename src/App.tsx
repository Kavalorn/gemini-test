import React from 'react';
import { Container } from './components/layout/Container/Container.component';
import { Table } from './components/common/Table/Table.component';
import accounts from './samples/accounts.json'

function App() {
  return (
    <div data-testid={'App'}>
      <Container>
        <Table
          items={accounts}
          headers={{
            username: "Username",
            password: "Password",
            actions: "Actions",
          }}
          customHandlers={{
            actions: (item) => {
              return <div>buttons</div>
            }
          }} />
      </Container>
    </div>
  );
}

export default App;
