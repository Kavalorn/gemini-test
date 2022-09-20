import React from 'react';
import { Modal } from './components/common/Modal/Modal.component';
import { AccountsTable } from './components/usecases/AccountsTable/AccountsTable.components';
import { Container } from './components/layout/Container/Container.component';
import { EditUserModal } from './components/usecases/EditUserModal/EditUserModal.component';

function App() {
  return (
    <div data-testid={'App'}>
      <Container>
        <EditUserModal>
          {({toggleOpened}) => (
            <div className="flex justify-end">
              <button onClick={toggleOpened} className="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Account</button>
            </div>
          )}
        </EditUserModal>
        <AccountsTable />
      </Container>
    </div>
  );
}

export default App;
