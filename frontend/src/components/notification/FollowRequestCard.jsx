"use client";

export default function FollowRequestCard({
  user,
  onAccept,
  onDecline,
}) {
  return (
    <div className="flex items-center justify-between p-4 border-b dark:border-neutral-800">

      {/* Left Side */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
          <img
            src={user.follower.profile_image}
            alt="user"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="font-semibold">{user.follower.username}</p>
          <p className="text-sm text-gray-500">
            {user.follower.fullname}
          </p>
        </div>
      </div>

      {/* Right Side Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onAccept(user._id)}
          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
        >
          Accept
        </button>

        <button
          onClick={() => onDecline(user._id)}
          className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-md text-sm"
        >
          Decline
        </button>
      </div>

    </div>
  );
}
