import { useState } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  VideoCameraIcon,
  UserGroupIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface Meeting {
  id: string;
  title: string;
  type: 'research' | 'progress' | 'defense' | 'seminar' | 'other';
  mode: 'online' | 'offline' | 'hybrid';
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  organizer: string;
  participants: string[];
  description: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  meetingLink?: string;
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: '研究生周进展汇报',
    type: 'progress',
    mode: 'hybrid',
    location: '理工楼A201',
    date: '2024-02-15',
    startTime: '14:00',
    endTime: '16:00',
    organizer: '张教授',
    participants: ['王小明', '李小华', '张三'],
    description: '本周研究进展汇报会议，请准备PPT',
    status: 'scheduled',
    meetingLink: 'https://meet.example.com/abc123',
  },
  {
    id: '2',
    title: '论文开题答辩',
    type: 'defense',
    mode: 'offline',
    location: '综合楼B302',
    date: '2024-02-20',
    startTime: '09:00',
    endTime: '11:00',
    organizer: '李教授',
    participants: ['李小华', '评审专家1', '评审专家2'],
    description: '研究生论文开题答辩',
    status: 'scheduled',
  },
];

export default function MeetingManagement() {
  const [meetings] = useState<Meeting[]>(mockMeetings);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const getModeIcon = (mode: Meeting['mode']) => {
    switch (mode) {
      case 'online':
        return <VideoCameraIcon className="h-5 w-5 text-blue-500" />;
      case 'offline':
        return <MapPinIcon className="h-5 w-5 text-green-500" />;
      case 'hybrid':
        return <UserGroupIcon className="h-5 w-5 text-purple-500" />;
    }
  };

  const getTypeText = (type: Meeting['type']) => {
    const typeMap = {
      research: '研究会议',
      progress: '进展汇报',
      defense: '论文答辩',
      seminar: '学术讨论',
      other: '其他',
    };
    return typeMap[type] || type;
  };

  const getModeText = (mode: Meeting['mode']) => {
    const modeMap = {
      online: '线上',
      offline: '线下',
      hybrid: '混合',
    };
    return modeMap[mode] || mode;
  };

  const getStatusBadgeColor = (status: Meeting['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Meeting['status']) => {
    const statusMap = {
      scheduled: '已安排',
      in_progress: '进行中',
      completed: '已结束',
      cancelled: '已取消',
    };
    return statusMap[status] || status;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">会议管理</h1>
          <p className="mt-2 text-sm text-gray-700">
            管理所有研究生和导师的会议安排。
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="inline-block w-5 h-5 mr-2 -mt-1" />
            安排会议
          </button>
        </div>
      </div>

      {/* 视图切换和筛选 */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              viewMode === 'list'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            列表视图
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              viewMode === 'calendar'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            日历视图
          </button>
        </div>
        <div>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">全部类型</option>
            <option value="research">研究会议</option>
            <option value="progress">进展汇报</option>
            <option value="defense">论文答辩</option>
            <option value="seminar">学术讨论</option>
          </select>
        </div>
        <div>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">全部方式</option>
            <option value="online">线上</option>
            <option value="offline">线下</option>
            <option value="hybrid">混合</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* 会议列表 */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      会议信息
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      时间地点
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      组织者
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      参会人员
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      状态
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">操作</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {meetings.map((meeting) => (
                    <tr key={meeting.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                        <div className="flex flex-col">
                          <div className="font-medium text-gray-900">{meeting.title}</div>
                          <div className="text-gray-500 text-sm">{getTypeText(meeting.type)}</div>
                          <div className="flex items-center mt-1">
                            {getModeIcon(meeting.mode)}
                            <span className="ml-1 text-sm text-gray-500">{getModeText(meeting.mode)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="h-5 w-5 text-gray-400 mr-1" />
                          <span>{meeting.date}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <ClockIcon className="h-5 w-5 text-gray-400 mr-1" />
                          <span>{meeting.startTime} - {meeting.endTime}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <MapPinIcon className="h-5 w-5 text-gray-400 mr-1" />
                          <span>{meeting.location}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {meeting.organizer}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {meeting.participants.map((participant, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                            >
                              {participant}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeColor(meeting.status)}`}>
                          {getStatusText(meeting.status)}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => setSelectedMeeting(meeting)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {/* 处理删除 */}}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 分页 */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-1 justify-between sm:hidden">
          <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            上一页
          </button>
          <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            下一页
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              显示第 <span className="font-medium">1</span> 到 <span className="font-medium">10</span> 条，
              共 <span className="font-medium">20</span> 条记录
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                上一页
              </button>
              <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                2
              </button>
              <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                下一页
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
