import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  UserCircleIcon,
  BellIcon,
  CogIcon,
  KeyIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

interface SettingsSection {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

const sections: SettingsSection[] = [
  { id: 'profile', name: '个人信息', icon: UserCircleIcon },
  { id: 'notifications', name: '通知设置', icon: BellIcon },
  { id: 'security', name: '安全设置', icon: ShieldCheckIcon },
  { id: 'system', name: '系统设置', icon: CogIcon },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    browser: true,
    taskReminders: true,
    meetingReminders: true,
    systemUpdates: false,
  });
  const [systemSettings, setSystemSettings] = useState({
    language: 'zh',
    theme: 'light',
    timezone: 'Asia/Shanghai',
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">个人信息</h3>
        <p className="mt-1 text-sm text-gray-500">
          更新您的个人信息和头像
        </p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
            ) : (
              <UserCircleIcon className="h-24 w-24 text-gray-300" />
            )}
          </div>
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
          >
            <span className="sr-only">更换头像</span>
            <CogIcon className="h-5 w-5 text-gray-400" />
            <input
              id="avatar-upload"
              name="avatar-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-500">更换头像</div>
          <div className="text-xs text-gray-400">JPG, PNG, GIF 格式，最大 2MB</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            姓名
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            邮箱
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            手机号
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            职称
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">通知设置</h3>
        <p className="mt-1 text-sm text-gray-500">
          选择您想要接收的通知类型
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="email"
              name="email"
              type="checkbox"
              checked={notificationSettings.email}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                email: e.target.checked,
              })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              邮件通知
            </label>
            <p className="text-sm text-gray-500">接收重要更新的邮件通知</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="browser"
              name="browser"
              type="checkbox"
              checked={notificationSettings.browser}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                browser: e.target.checked,
              })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="browser" className="text-sm font-medium text-gray-700">
              浏览器通知
            </label>
            <p className="text-sm text-gray-500">接收实时的浏览器推送通知</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="taskReminders"
              name="taskReminders"
              type="checkbox"
              checked={notificationSettings.taskReminders}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                taskReminders: e.target.checked,
              })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="taskReminders" className="text-sm font-medium text-gray-700">
              任务提醒
            </label>
            <p className="text-sm text-gray-500">接收任务截止日期和更新提醒</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="meetingReminders"
              name="meetingReminders"
              type="checkbox"
              checked={notificationSettings.meetingReminders}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                meetingReminders: e.target.checked,
              })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="meetingReminders" className="text-sm font-medium text-gray-700">
              会议提醒
            </label>
            <p className="text-sm text-gray-500">接收会议开始前的提醒</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">安全设置</h3>
        <p className="mt-1 text-sm text-gray-500">
          管理您的账户安全和隐私设置
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-900">修改密码</h4>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                当前密码
              </label>
              <input
                type="password"
                name="current-password"
                id="current-password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                新密码
              </label>
              <input
                type="password"
                name="new-password"
                id="new-password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                确认新密码
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900">双因素认证</h4>
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <KeyIcon className="mr-2 h-5 w-5 text-gray-400" />
              启用双因素认证
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">系统设置</h3>
        <p className="mt-1 text-sm text-gray-500">
          自定义系统显示和行为
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            语言
          </label>
          <select
            id="language"
            name="language"
            value={systemSettings.language}
            onChange={(e) => setSystemSettings({
              ...systemSettings,
              language: e.target.value,
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
            主题
          </label>
          <select
            id="theme"
            name="theme"
            value={systemSettings.theme}
            onChange={(e) => setSystemSettings({
              ...systemSettings,
              theme: e.target.value,
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="light">浅色</option>
            <option value="dark">深色</option>
            <option value="system">跟随系统</option>
          </select>
        </div>

        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
            时区
          </label>
          <select
            id="timezone"
            name="timezone"
            value={systemSettings.timezone}
            onChange={(e) => setSystemSettings({
              ...systemSettings,
              timezone: e.target.value,
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="Asia/Shanghai">中国标准时间 (UTC+8)</option>
            <option value="Asia/Tokyo">日本标准时间 (UTC+9)</option>
            <option value="America/Los_Angeles">太平洋标准时间 (UTC-8)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'system':
        return renderSystemSettings();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          {/* 侧边栏 */}
          <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`${
                    activeSection === section.id
                      ? 'bg-gray-50 text-indigo-700 hover:bg-white'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center rounded-md px-3 py-2 text-sm font-medium w-full`}
                >
                  <section.icon
                    className={`${
                      activeSection === section.id
                        ? 'text-indigo-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    } -ml-1 mr-3 h-6 w-6 flex-shrink-0`}
                  />
                  <span className="truncate">{section.name}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* 主要内容区域 */}
          <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 sm:p-6">{renderContent()}</div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  保存更改
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
