import React from 'react';

interface UserInfoItemProps {
  label: string;
  value: string;
}

const UserInfoItem: React.FC<UserInfoItemProps> = ({ label, value }) => (
  <div className="w-full">
    <span className="text-sm sm:text-base">{label}:</span>
    <div className="border-2 rounded-[10px] border-tertiary w-full h-auto min-h-10 text-xs sm:text-sm flex justify-center items-center px-3 py-2 break-words">
      <span className="text-center font-ibm leading-relaxed tracking-wide">
        {value}
      </span>
    </div>
  </div>
);

export default UserInfoItem;
