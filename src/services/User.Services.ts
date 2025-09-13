import { PrismaClient } from "@prisma/client";
import { UserFilterDTO, CustomerUsersByAccountFilterQuery } from "../types/dtos/user.dtos";
import { getPagination } from "../functions/paginationfunc";
import { parseAccountIds } from "../helperfunctions/parseaccountids";
import ExcelJS from "exceljs";
import { ExcelExporter } from "../excel/excelclass";
type UserType = Awaited<ReturnType<typeof prisma.user.findMany>>[number];
 
const prisma = new PrismaClient();
//class to handle functions 
export class UserService {
   static async ManageCustomerUsersDataByAccountAssignment(
        userId: number,
        query: UserFilterDTO | CustomerUsersByAccountFilterQuery,
        mode: "list" | "download"
    ): Promise<any> {
        const { page, perPage, skip, take } = getPagination(query);
        let accountIdArray: number[] = [];
        if ((query as any).accountIds === "all") {
            const user = await prisma.user.findUnique({
                where: { user_id: userId },
                select: { assigned_account_ids: true },
            });
            if (!user || !user.assigned_account_ids.length) {
                if (mode === "list") return { data: [], total: 0, page, perPage };
                else throw new Error("NO_ASSIGNED_ACCOUNTS");
            }
            accountIdArray = user.assigned_account_ids;
        } else if (typeof (query as any).accountIds === "string") {
            accountIdArray = parseAccountIds((query as any).accountIds);

            if (!accountIdArray.length) throw new Error("INVALID_ACCOUNT_IDS");
        } else {
            throw new Error("MISSING_ACCOUNT_IDS");
        }
        const filters: any = {
            assigned_account_ids: { hasSome: accountIdArray },
        };

        if ((query as any).first_name) {
            filters.first_name = { contains: (query as any).first_name, mode: "insensitive" };
        }

        if ((query as any).last_name) {
            filters.last_name = { contains: (query as any).last_name, mode: "insensitive" };
        }

        if ((query as any).email) {
            filters.email = { contains: (query as any).email, mode: "insensitive" };
        }

        if ((query as any).status) {
            filters.status = { equals: (query as any).status, mode: "insensitive" };
        }

        if ((query as any).user_role_id) {
            filters.user_role_id = Number((query as any).user_role_id);
        }

        if (typeof (query as any).is_customer_user !== "undefined") {
            filters.is_customer_user =
                String((query as any).is_customer_user).toLowerCase() === "true";
        }

        const totalUsers = await prisma.user.count({ where: filters });

        const users = await prisma.user.findMany({
            where: filters,
            skip: mode === "list" ? skip : 0,
            take: mode === "list" ? take : undefined,
            orderBy:
                mode === "list"
                    ? { user_id: "asc" } // Replace with buildOrderByFromSort if needed
                    : { user_id: "asc" },
            select: {
                user_id: true,
                first_name: true,
                last_name: true,
                email: true,
                status: true,
                is_customer_user: true,
                assigned_account_ids: true,
                first_active: true,
                last_active: true,
                designation: true,
                user_role_id: true,
                user_role_ref: { select: { name: true } },
            },
        });
        
        if (mode === "list") {
            // Mapping for list mode
            const data = users.map((user) => ({
                user_id: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                status: user.status,
                is_customer_user: user.is_customer_user,
                designation: user.designation,
                assigned_account_ids: user.assigned_account_ids,
                first_active: user.first_active,
                last_active: user.last_active,
                user_role_ref: user.user_role_ref,
            }));


            // Mapping for download mode
            const formattedData = users.map((user, index) => ({
                sno: index + 1 + skip,
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                designation: user.designation,
            }));


            const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
            const totalPages = Math.max(1, Math.ceil(totalUsers / (perPage || 1)));
            const filename = `customer_users_${page}_of_${totalPages}_${timestamp}.xlsx`;

            const exporter = new ExcelExporter(); // Your existing Excel exporter
            await exporter.generateWorkbook({
                sheetName: "Users",
                title: "Customer Users Export",
                subtitle: `Page ${page} of ${totalPages}`,
                columns: [
                    { header: "S.No", key: "sno", width: 20 },
                    { header: "Name", key: "name", width: 30 },
                    { header: "Email", key: "email", width: 30 },
                    { header: "Designation", key: "designation", width: 30 },
                ],
                data: formattedData,
                filename,
            });

            const buffer = await exporter.writeToBuffer();
            return { buffer, filename };
        }
    }
}

