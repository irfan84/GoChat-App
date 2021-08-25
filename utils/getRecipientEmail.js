const getRecipientEmail = (users, loggedInEmail) =>
  users.filter((userToCheck) => userToCheck !== loggedInEmail)[0];


  export default getRecipientEmail;