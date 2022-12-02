import ConnectionManager from "../lib/ConnectionManager";

const connect = (connectionString: string) => {
  const connection = new ConnectionManager();
  connection.setString(connectionString);
};
