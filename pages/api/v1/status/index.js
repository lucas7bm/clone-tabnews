import database from "infra/database.js";

export default async function status(request, response) {
  const serverVersion = (await database.query("SHOW server_version;")).rows[0]
    .server_version;
  const maxConnections = parseInt(
    (await database.query("SHOW max_connections;")).rows[0].max_connections,
  );

  const openedConnections = (
    await database.query({
      text: "SELECT COUNT(*)::int AS connections_in_use FROM pg_stat_activity WHERE datname = $1;",
      values: [process.env.POSTGRES_DB],
    })
  ).rows[0].connections_in_use;
  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: serverVersion,
        max_connections: maxConnections,
        opened_connections: openedConnections,
      },
    },
  });
}
