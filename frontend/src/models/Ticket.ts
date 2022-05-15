import { Account } from "./Account"

export type Ticket = {
  ID: number,
  Topic: string,
  Description: string,
  Priority: number,
  Type: number,
  Status: number,
  AccountID: number,
}

enum TicketStatus {
  New = 1,
  Open = 2,
  InProgress = 3,
  Resolved = 4,
}

enum TicketType {
  Other = 1,
  Bug = 2,
  Feature = 3,
}

enum TicketPriority {
  Low = 1,
  Medium = 2,
  High = 3,
}

export function mapTicketPriority(priority: number): string {
  switch (priority) {
    case TicketPriority.Low:
      return 'Low'
    case TicketPriority.Medium:
      return 'Medium'
    case TicketPriority.High:
      return 'High'
    default:
      return 'Low'
  }
}

export function mapTicketType(type: number): string {
  switch (type) {
    case TicketType.Bug:
      return 'Bug'
    case TicketType.Feature:
      return 'Feature'
    default:
      return 'Other'
  }
}

export function mapTicketStatus(status: number): string {
  switch (status) {
    case TicketStatus.New:
      return 'New'
    case TicketStatus.Open:
      return 'Open'
    case TicketStatus.InProgress:
      return 'In Progress'
    case TicketStatus.Resolved:
      return 'Resolved'
    default:
      return 'New'
  }
}