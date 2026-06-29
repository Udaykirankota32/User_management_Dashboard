import { useState, useMemo } from "react";
import useUsers from "./hooks/useUsers";
import { SORT_ORDER, SORT_FIELDS } from "./utils/constants_temp";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterPopup from "./components/FilterPopup/FilterPopup";
import UserTable from "./components/UserTable/UserTable";
import Pagination from "./components/Pagination/Pagination";
import UserForm from "./components/UserForm/UserForm";
import ConfirmDelete from "./components/ConfirmDelete/ConfirmDelete";

import "./styles/global.css";

const App = () => {
  const { users, loading, error, addUser, editUser, removeUser } = useUsers();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ firstName: "", lastName: "", email: "", department: "" });
  const [sortField, setSortField] = useState(SORT_FIELDS.FIRST_NAME);
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASC);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC));
    } else {
      setSortField(field);
      setSortOrder(SORT_ORDER.ASC);
    }
    setCurrentPage(1);
  };

  const handleAddClick = () => {
    setEditingUser(null);
    setFormError(null);
    setShowUserForm(true);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormError(null);
    setShowUserForm(true);
  };

  const handleDeleteClick = (user) => {
    setDeletingUser(user);
  };

  const handleFormSubmit = async (formData) => {
    let result;
    if (editingUser) {
      result = await editUser(editingUser.id, formData);
    } else {
      result = await addUser(formData);
    }
    if (result.success) {
      setShowUserForm(false);
      setEditingUser(null);
    } else {
      setFormError(result.message);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingUser) return;
    await removeUser(deletingUser.id);
    setDeletingUser(null);
  };

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    setCurrentPage(1);
    setShowFilterPopup(false);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const processedUsers = useMemo(() => {
    let result = [...users];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.firstName.toLowerCase().includes(q) ||
          u.lastName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }

    if (filters.firstName) result = result.filter((u) => u.firstName.toLowerCase().includes(filters.firstName.toLowerCase()));
    if (filters.lastName) result = result.filter((u) => u.lastName.toLowerCase().includes(filters.lastName.toLowerCase()));
    if (filters.email) result = result.filter((u) => u.email.toLowerCase().includes(filters.email.toLowerCase()));
    if (filters.department) result = result.filter((u) => u.department === filters.department);

    result.sort((a, b) => {
      const valA = a[sortField].toString().toLowerCase();
      const valB = b[sortField].toString().toLowerCase();
      return sortOrder === SORT_ORDER.ASC
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

    return result;
  }, [users, searchQuery, filters, sortField, sortOrder]);

  const totalPages = Math.ceil(processedUsers.length / pageSize);
  const paginatedUsers = processedUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <Header onAddUser={handleAddClick} />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
        {error && <div className="error-banner">{error}</div>}

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onFilterClick={() => setShowFilterPopup(true)}
          activeFilters={filters}
        />

        {loading ? (
          <div className="loading-spinner">Loading users...</div>
        ) : (
          <>
            <UserTable
              users={paginatedUsers}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={processedUsers.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
            />
          </>
        )}
      </main>

      {showFilterPopup && (
        <FilterPopup
          filters={filters}
          onApply={handleApplyFilters}
          onClose={() => setShowFilterPopup(false)}
        />
      )}

      {showUserForm && (
        <UserForm
          editingUser={editingUser}
          onSubmit={handleFormSubmit}
          onClose={() => setShowUserForm(false)}
          apiError={formError}
        />
      )}

      {deletingUser && (
        <ConfirmDelete
          user={deletingUser}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingUser(null)}
        />
      )}
    </div>
  );
};

export default App;