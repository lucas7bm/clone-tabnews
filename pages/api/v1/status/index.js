import database from "infra/database.js";

async function status(request, response) {
  const serverVersion = (await database.query("SHOW server_version;")).rows[0]
    .server_version;
  const maxConnections = (await database.query("SHOW max_connections;")).rows[0]
    .max_connections;
  const connectionsInUse = (
    await database.query(
      "SELECT COUNT(*) AS connections_in_use FROM pg_stat_activity",
    )
  ).rows[0].connections_in_use;
  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: serverVersion,
        max_connections: maxConnections,
        connections_in_use: connectionsInUse,
      },
    },
  });
}

export default status;
