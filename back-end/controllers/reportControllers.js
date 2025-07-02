const Task = require("../models/Task");
const User = require("../models/User");
const excelJs = require("exceljs");

//@desc Export all tasks as an Excel file
//@route GET /api/reports/export/tasks
//@access Private (Admin)

const exportTasksReport = async (req, res) => {
    try {
        const tasks = await Task.find().populate("assignedTo", "name email");

        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet("Tasks Report");

        worksheet.columns = [
            { header: "Task ID", key: "_id", width: 25},
            { header: "Title", key: "title", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Priority", key: "priority", width: 15 },
            { header: "Status", key: "status", width: 20 },
            { header: "Due Date", key: "dueDate", width: 20 },
            { header: "Assigned To", key: "assignedTo", width: 30 },
           
        ];
        tasks.forEach((task) => {
            const assignedTo = task.assignedTo.map(user => `${user.name} (${user.email})`).join(", ");
            worksheet.addRow({
                _id: task._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate.toISOString().split("T")[0], // Format date to YYYY-MM-DD
                assignedTo: assignedTo || "Unassigned",
            });
        } 
    );

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
        "Content-Disposition",
        `attachment; filename=tasks_report.xlsx`
    );

    return workbook.xlsx.write(res).then(() => {
        res.end();
    } );
    }

    catch
    (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };


    // @desc Export all users as an Excel file
    // @route GET /api/reports/export/users
    // @access Private (Admin)
const exportUsersReport = async (req, res) => {
    try{
        const users = await User.find().select("name eamil _id").lean();

        const UserTasks = await Task.find().populate("assignedTo", "name email");

        const userTasksMap = {};
        UserTasks.forEach(task => {
            userTaskMap[user._id] = {
                name: user.name,
                email: user.email,
                taskCount: 0,
                pendingTasks: 0,
                inProgressTasks: 0,
                completedTasks: 0,
            };
        }
        );

        userTasksMap.forEach((task) => {
            if (task.assignedTO) {
                task.assignedTo.forEach((assignedUser) => {
                    if (userTasksMap[assignedUser._id]) {
                        userTasksMap[assignedUser._id].taskCount++;
                        if (task.status === "Pending") {
                            userTasksMap[assignedUser._id].pendingTasks++;
                        } else if (task.status === "In Progress") {
                            userTasksMap[assignedUser._id].inProgressTasks++;
                        } else if (task.status === "Completed") {
                            userTasksMap[assignedUser._id].completedTasks++;
                        }
                    }
                }
                );

            }
        }
        );
        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet("Users Report");

        worksheet.columns = [
            { header: "User Name", key: "name", width: 30 },
            { header: "Email", key: "email", width: 30 },
            { header: "Total Assigned Tasks", key: "taskCount", width: 20 },
            { header: "Pending Tasks", key: "pendingTasks", width: 20 },
            {
                header: "In Progress Tasks",
                key: "inProgressTasks",
                width: 20,
            },
            { header: "Completed Tasks", key: "completedTasks", width: 20 },
        ];
        Object.values(userTaskMap).forEach((user) => {
            worksheet.addRow(user);
        }
        );

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=users_report.xlsx`
        );

        return workbook.xlsx.write(res).then(() => {
            res.end();
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
};
};
module.exports = {
    exportTasksReport,
    exportUsersReport,
};