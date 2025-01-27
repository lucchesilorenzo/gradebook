export type UserSettings = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string;
  tax_id: string;
  phone_number: string;
  date_of_birth: string;
  address: string;
  gender: string;
  image: string | null;
  created_at: string;
  updated_at: string;
};

export type UserNotification = {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  read_at: string | null;
  notifiable_id: string;
  notifiable_type: string;
  data: {
    schedule_id: string;
    course: string;
    course_unit: string;
    start_datetime: string;
  };
};

export type UserNotificationWithCount = {
  notifications: UserNotification[];
  unread_notifications: number;
};
