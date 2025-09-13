# Copilot Instructions for AI Agents

## Project Overview
This project is a TypeScript backend service using Prisma ORM for database access. The main business logic is implemented in service classes (e.g., `UserService` in `test.service.ts`). Data models and Prisma client code are generated in the `generated/prisma/` directory, with the schema defined in `prisma/schema.prisma`.

## Key Components
- **Service Layer**: Core logic is in service classes (e.g., `UserService`). Methods handle filtering, pagination, and export workflows.
- **Prisma Integration**: Database queries use Prisma Client (`@prisma/client`). Schema is managed in `prisma/schema.prisma`.
- **Excel Export**: Data export uses an `ExcelExporter` class (see import in `test.service.ts`). Ensure correct path and API usage for workbook generation.

## Developer Workflows
- **Database Access**: Use Prisma Client for all DB operations. Models/types are auto-generated in `generated/prisma/`.
- **Pagination & Filtering**: Follow the pattern in `UserService.ManageCustomerUsersDataByAccountAssignment` for query param handling and result formatting.
- **Exporting Data**: For downloads, use the `ExcelExporter` pattern: format data, set columns, and generate buffers for file output.

## Project Conventions
- **TypeScript**: All logic is in `.ts` files. Use type annotations and interfaces for DTOs and results.
- **Sort Fields**: Allowed sort fields are defined as arrays (see `USER_SORT_FIELDS`). Use helper functions for building `orderBy` clauses.
- **Error Handling**: Throw explicit errors for invalid/missing input (e.g., `NO_ASSIGNED_ACCOUNTS`, `INVALID_ACCOUNT_IDS`).
- **File Structure**:
  - `test.service.ts`: Main service logic
  - `generated/prisma/`: Generated Prisma client and types
  - `prisma/schema.prisma`: Database schema

## Integration Points
- **External Dependencies**: Prisma ORM (`@prisma/client`), Excel export utility (custom or third-party)
- **Cross-Component Communication**: Service methods interact with Prisma and export utilities. Keep interfaces clean and data flows explicit.

## Example Patterns
- **Pagination Helper**:
  ```typescript
  function getPagination(query) { /* ... */ }
  ```
- **Export Workflow**:
  ```typescript
  const exporter = new ExcelExporter();
  await exporter.generateWorkbook({ /* ... */ });
  const buffer = await exporter.writeToBuffer();
  ```
- **Error Handling**:
  ```typescript
  if (!accountIdArray.length) throw new Error("INVALID_ACCOUNT_IDS");
  ```

## How to Extend
- Add new service methods in `test.service.ts` following existing patterns.
- Update Prisma schema in `prisma/schema.prisma` and regenerate client as needed.
- For new exports, extend the ExcelExporter usage pattern.

---

**Feedback Requested:**
Please review and suggest improvements or clarify any missing/unclear sections. Indicate if more details on workflows, conventions, or integration are needed.
