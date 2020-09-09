export const authentificate = user => sessionStorage.setItem('user', user);

export const userAuthentificated = () => JSON.parse(sessionStorage.getItem('user'));

export const isAuthentificated = (user) => {
    const userStored = sessionStorage.getItem('user');
    if (!userStored || !user) return false;

    return user.name === JSON.parse(userStored).name;
};

export const hasRole = (user, role) => user.role === role;
