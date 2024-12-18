import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const stats = [
  { name: '总导师数', value: '12 位' },
  { name: '总学生数', value: '120 位' },
  { name: '待处理任务', value: '8 个' },
  { name: '本周会议', value: '4 场' },
]

const recentActivities = [
  {
    id: 1,
    type: '任务',
    content: '张导师发布了新的研究计划',
    date: '10 分钟前',
  },
  {
    id: 2,
    type: '会议',
    content: '下周三下午2点项目进度讨论会',
    date: '1 小时前',
  },
  {
    id: 3,
    type: '通知',
    content: '请及时提交月度总结报告',
    date: '2 小时前',
  },
]

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">欢迎回来, {user?.name}</h1>
        
        {/* 统计卡片 */}
        <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </dd>
            </div>
          ))}
        </dl>

        {/* 最近活动 */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">最近活动</h2>
          <div className="mt-4 flow-root">
            <ul role="list" className="-mb-8">
              {recentActivities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivities.length - 1 ? (
                      <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative px-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 ring-8 ring-white">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">{activity.type}</span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">{activity.date}</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>{activity.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
