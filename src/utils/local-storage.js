

const getData = () => {
    const data = localStorage.getItem('data');
    return data ? JSON.parse(data) : {};
}

const setData = (data) => {
    localStorage.setItem('data', JSON.stringify(data));
}

const updateSidebar = (value) => {
    const data = getData() || {};
    data.sidebarCollapse = value;
    setData(data);
}

const getSidebar = () => {
    const data = getData() || {};
    return data?.sidebarCollapse || false;
}

const addUser = (user) => {
    const data = getData() || {};
    data.user = user;
    setData(data);
}

const checkUser = () => {
    const data = getData() || {};
    return data.user;
}

const removeUser = () => {
    const data = getData() || {};
    delete data.user;
    setData(data);
}

export {
    getData,
    setData,
    updateSidebar,
    getSidebar,
    addUser,
    removeUser,
    checkUser
};