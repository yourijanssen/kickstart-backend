import * as mysql2 from 'mysql2';

/**
 * A utility class for managing a MySQL relational database connection pool.
 */
export class RelationalDatabase {
  /**
   * The singleton instance of the connection pool.
   */
  private static pool: mysql2.Pool | null = null;

  /**
   * Get the MySQL connection pool.
   * If the pool does not exist, it will be initialized.
   * @returns The MySQL connection pool instance or null if initialization fails.
   */
  public static getPool(): mysql2.Pool | null {
    if (RelationalDatabase.pool == null) {
      RelationalDatabase.initializeRelationalDatabase();
    }

    return RelationalDatabase.pool;
  }

  /**
   * Initialize the MySQL connection pool using environment (.env) variables.
   * @throws Error if initialization fails.
   */
  private static initializeRelationalDatabase(): void {
    try {
      RelationalDatabase.pool = mysql2.createPool({
        host: process.env.HOST_RELATIONAL_DB,
        port: parseInt(process.env.PORT_RELATIONAL_DB || '3306'),
        user: process.env.USER_RELATIONAL_DB,
        password: process.env.PASSWORD_RELATIONAL_DB,
        database: process.env.SCHEMA_RELATIONAL_DB,
        waitForConnections: RelationalDatabase.convertToBoolean(
          process.env.WAIT_FOR_CONNECTIONS_RELATIONAL_DB
        ),
        connectionLimit: parseInt(process.env.CONNECTION_LIMIT_RELATIONAL_DB || '10'),
        queueLimit: parseInt(process.env.QUEUE_LIMIT_RELATIONAL_DB || '0'),
      });
    } catch (error) {
      throw new Error('Failed to initialize the database connection pool.');
    }
  }

  /**
   * Convert a string to a boolean value.
   * @param input - The input string to convert.
   * @returns The boolean value or undefined if conversion fails.
   */
  private static convertToBoolean(input: string | undefined): boolean | undefined {
    let result = false;

    try {
      if (input !== undefined) {
        result = JSON.parse(input.toLowerCase());
      }
    } catch (e) {
      return result;
    }
    return result;
  }
}
