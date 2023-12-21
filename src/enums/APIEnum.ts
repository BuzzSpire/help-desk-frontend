export const API_DOMAIN = "http://localhost:8080";

export enum UserEndpoints {
  GetUserById = API_DOMAIN + "/api/users/{id}", // Get User By Id
  UpdateUserBasicInfo = API_DOMAIN + "/api/users/", // Update User Basic Info
  DeleteUser = API_DOMAIN + "/api/users/{id}", // Delete User
  UpdateUserPassword = API_DOMAIN + "/api/users/{id}/password", // Update User Password
  GetAllUsers = API_DOMAIN + "/api/users/", // Get All Users
  AddUser = API_DOMAIN + "/api/users/", // Add User
  GetMe = API_DOMAIN + "/api/users/me", // Get Me
  getAllSupporters = API_DOMAIN + "/api/users/supporters", // Get All Supporters
}

export enum UserTitleEndpoints {
  UpdateUserTitle = API_DOMAIN + "/api/titles/{id}", // Update User Title
  DeleteUserTitle = API_DOMAIN + "/api/titles/{id}", // Delete User Title
  GetAllUserTitles = API_DOMAIN + "/api/titles/", // Get All User Titles
  AddUserTitle = API_DOMAIN + "/api/titles/", // Add User Title
}

export enum TicketEndpoints {
  AddTicketAssignee = API_DOMAIN +
    "/api/ticket/{ticketId}/assignee/{assigneeId}", // Add Ticket Assignee
  GetAllTickets = API_DOMAIN + "/api/ticket/", // Get All Tickets
  AddTicket = API_DOMAIN + "/api/ticket/", // Add Ticket
  GetTicketById = API_DOMAIN + "/api/ticket/", // Get Ticket By Id
  DeleteTicketById = API_DOMAIN + "/api/ticket/", // Delete Ticket By Id /api/ticket/{id}
  GetTicketsByUserId = API_DOMAIN + "/api/ticket/user/{id}", // Get Ticket By User Id
  RemoveTicketAssignee = API_DOMAIN + "/api/ticket/{ticketId}/assignee/", // Remove Ticket Assignee
  CloseTicket = API_DOMAIN + "/api/ticket/", // Close ticket
  GetMyTickets = API_DOMAIN + "/api/ticket/myTickets", // Get My Tickets
  UpdateTicketStatus = API_DOMAIN + "/api/ticket/{ticketId}/status/{statusId}", // Update Ticket Status
}

export enum RoleEndpoints {
  UpdateRole = API_DOMAIN + "/api/roles/{id}", // Update Role
  DeleteRole = API_DOMAIN + "/api/roles/{id}", // Delete Role
  GetAllRoles = API_DOMAIN + "/api/roles/", // Get All Roles
  AddRole = API_DOMAIN + "/api/roles/", // Add Role
}

export enum TicketStatusEndpoints {
  GetAllTicketStatus = API_DOMAIN + "/api/status/", // Get all ticket status
  AddTicketStatus = API_DOMAIN + "/api/status/", // Add new ticket status
  DeleteTicketStatus = API_DOMAIN + "/api/status/", // Delete ticket status
}

export enum TicketPriorityEndpoints {
  GetAllTicketPriorities = API_DOMAIN + "/api/priority/", // Get all ticket priorities
  AddTicketPriority = API_DOMAIN + "/api/priority/", // Add ticket priority
  DeleteTicketPriority = API_DOMAIN + "/api/priority/{id}", // Delete ticket priority
}

export enum TicketMassageEndpoints {
  GetAllTicketMassages = API_DOMAIN + "/api/massages/", // Get all Ticket Massages
  AddTicketMassage = API_DOMAIN + "/api/massages/", // Add Ticket Massage
  GetTicketMassagesById = API_DOMAIN + "/api/massages/{id}", // Get all Ticket Massages by massage id
  DeleteTicketMassage = API_DOMAIN + "/api/massages/", // Delete Ticket Massage
}

export enum AuthEndpoints {
  VerifyToken = API_DOMAIN + "/api/auth/", // Verify Token
  Login = API_DOMAIN + "/api/auth/", // Login
}

export enum ConfigEndpoints {
  GetConfigList = API_DOMAIN + "/api/config/", // Get Config
  UpdateDefaultConfig = API_DOMAIN + "/api/config/default/", // Update Default Config
  GetDefaultConfig = API_DOMAIN + "/api/config/default", // Get Default Config
  AddConfig = API_DOMAIN + "/api/config/", // Get Config
  DeleteConfig = API_DOMAIN + "/api/config/", // Delete Config
}
