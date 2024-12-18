# 导师管理系统类图设计

## 核心实体类

```mermaid
classDiagram
    class User {
        +int id
        +string email
        +string password
        +string name
        +string phone
        +string avatar
        +UserRole role
        +DateTime createdAt
        +DateTime updatedAt
        +validatePassword()
        +updateProfile()
    }

    class Mentor {
        +int id
        +string department
        +string title
        +string specialization
        +int maxStudents
        +int currentStudents
        +List~Student~ students
        +List~Task~ tasks
        +List~Meeting~ meetings
        +addStudent()
        +removeStudent()
        +assignTask()
        +scheduleMeeting()
    }

    class Student {
        +int id
        +string grade
        +string major
        +string status
        +Mentor mentor
        +List~Task~ tasks
        +List~Meeting~ meetings
        +float averageScore
        +assignMentor()
        +submitTask()
        +attendMeeting()
    }

    class Task {
        +int id
        +string title
        +string description
        +TaskPriority priority
        +TaskStatus status
        +DateTime dueDate
        +Mentor assignedBy
        +Student assignedTo
        +List~Comment~ comments
        +updateStatus()
        +addComment()
        +setDueDate()
    }

    class Meeting {
        +int id
        +string title
        +string description
        +MeetingType type
        +MeetingMode mode
        +DateTime startTime
        +DateTime endTime
        +List~User~ participants
        +string location
        +string meetingLink
        +schedule()
        +cancel()
        +addParticipant()
        +removeParticipant()
    }

    class Comment {
        +int id
        +string content
        +User author
        +DateTime createdAt
        +edit()
        +delete()
    }

    class Settings {
        +int userId
        +string language
        +string theme
        +string timezone
        +NotificationPreferences notifications
        +updateSettings()
        +updateNotifications()
    }

    class Statistics {
        +generateMentorStats()
        +generateStudentStats()
        +generateTaskStats()
        +generateMeetingStats()
    }

    %% 枚举类型
    class UserRole {
        <<enumeration>>
        ADMIN
        MENTOR
        STUDENT
    }

    class TaskStatus {
        <<enumeration>>
        PENDING
        IN_PROGRESS
        COMPLETED
        OVERDUE
    }

    class TaskPriority {
        <<enumeration>>
        LOW
        MEDIUM
        HIGH
        URGENT
    }

    class MeetingType {
        <<enumeration>>
        ONE_ON_ONE
        GROUP
        SEMINAR
        WORKSHOP
    }

    class MeetingMode {
        <<enumeration>>
        ONLINE
        OFFLINE
        HYBRID
    }

    %% 关系定义
    User <|-- Mentor
    User <|-- Student
    Mentor "1" -- "*" Student
    Mentor "1" -- "*" Task
    Student "1" -- "*" Task
    Task "1" -- "*" Comment
    Meeting "*" -- "*" User
    User "1" -- "1" Settings
```

## Redux Store 结构

```mermaid
classDiagram
    class RootState {
        +AuthState auth
        +MentorState mentors
        +StudentState students
        +TaskState tasks
        +MeetingState meetings
        +SettingsState settings
        +UIState ui
    }

    class AuthState {
        +User currentUser
        +boolean isAuthenticated
        +boolean loading
        +string error
    }

    class MentorState {
        +List~Mentor~ mentors
        +boolean loading
        +string error
        +Mentor selectedMentor
    }

    class StudentState {
        +List~Student~ students
        +boolean loading
        +string error
        +Student selectedStudent
    }

    class TaskState {
        +List~Task~ tasks
        +boolean loading
        +string error
        +Task selectedTask
        +TaskFilters filters
    }

    class MeetingState {
        +List~Meeting~ meetings
        +boolean loading
        +string error
        +Meeting selectedMeeting
        +MeetingFilters filters
    }

    class SettingsState {
        +Settings userSettings
        +boolean loading
        +string error
    }

    class UIState {
        +boolean sidebarOpen
        +string currentTheme
        +List~Notification~ notifications
    }

    RootState -- AuthState
    RootState -- MentorState
    RootState -- StudentState
    RootState -- TaskState
    RootState -- MeetingState
    RootState -- SettingsState
    RootState -- UIState
```

## 组件结构

```mermaid
classDiagram
    class App {
        +Router router
        +render()
    }

    class DashboardLayout {
        +Sidebar sidebar
        +Header header
        +Component children
        +render()
    }

    class AuthGuard {
        +Component children
        +checkAuth()
        +render()
    }

    class Dashboard {
        +List~StatCard~ statCards
        +List~Chart~ charts
        +render()
    }

    class MentorManagement {
        +MentorList mentorList
        +MentorForm mentorForm
        +handleAdd()
        +handleEdit()
        +handleDelete()
        +render()
    }

    class StudentManagement {
        +StudentList studentList
        +StudentForm studentForm
        +handleAdd()
        +handleEdit()
        +handleDelete()
        +render()
    }

    class TaskManagement {
        +TaskList taskList
        +TaskForm taskForm
        +TaskFilters filters
        +handleAdd()
        +handleEdit()
        +handleDelete()
        +render()
    }

    class MeetingManagement {
        +MeetingList meetingList
        +MeetingForm meetingForm
        +MeetingCalendar calendar
        +handleSchedule()
        +handleCancel()
        +render()
    }

    class StatisticsPage {
        +List~Chart~ charts
        +List~StatCard~ statCards
        +handleDateRangeChange()
        +handleFilterChange()
        +render()
    }

    class SettingsPage {
        +ProfileSection profile
        +NotificationSection notifications
        +SecuritySection security
        +SystemSection system
        +handleSave()
        +render()
    }

    App -- DashboardLayout
    DashboardLayout -- AuthGuard
    AuthGuard -- Dashboard
    AuthGuard -- MentorManagement
    AuthGuard -- StudentManagement
    AuthGuard -- TaskManagement
    AuthGuard -- MeetingManagement
    AuthGuard -- StatisticsPage
    AuthGuard -- SettingsPage
```

## 说明

1. **核心实体类**
   - 描述了系统中的主要数据模型
   - 包含实体间的关系
   - 定义了主要的业务方法

2. **Redux Store 结构**
   - 展示了状态管理的层次结构
   - 定义了各个模块的状态类型
   - 包含了状态间的关系

3. **组件结构**
   - 展示了 React 组件的层次结构
   - 定义了组件间的包含关系
   - 描述了主要的组件方法

## 设计原则

1. **单一职责原则**
   - 每个类都有明确的职责
   - 组件功能聚焦且独立

2. **开放封闭原则**
   - 实体类可以通过继承扩展
   - 组件通过属性配置实现扩展

3. **依赖倒置原则**
   - 使用接口而非具体实现
   - Redux 状态管理解耦了数据和视图

4. **接口隔离原则**
   - 组件间通过属性进行通信
   - 状态更新通过 action 触发

5. **组合复用原则**
   - 使用组件组合而非继承
   - 通过 HOC 和 Hooks 复用逻辑

## 注意事项

1. 类图使用 Mermaid 语法绘制，需要在支持 Mermaid 的 Markdown 查看器中查看
2. 实际实现时可能需要根据具体需求调整类的属性和方法
3. Redux Store 结构可能需要根据应用规模调整
4. 组件结构可能随着功能开发而扩展
