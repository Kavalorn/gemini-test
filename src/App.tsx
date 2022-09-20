import React from 'react';
import { Modal } from './components/common/Modal/Modal.component';
import { AccountsTable } from './components/features/AccountsTable/AccountsTable.components';
import { Container } from './components/layout/Container/Container.component';

function App() {
  return (
    <div data-testid={'App'}>
      <Container>
        <AccountsTable />
      </Container>
    </div>
  );
}

export default App;
