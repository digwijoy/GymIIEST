from utils import calculate_angle, get_pose_landmarks
import cv2

# Thresholds for angle classification
SQUAT_THRESHOLDS = {
    'down': 90,
    'up': 160
}

# Global state for rep counting
squat_rep_count = 0
squat_state = "up"  # assume starting from standing position

def process_frame_squats(frame, pose):
    """
    Process a video frame to detect squats and count reps.

    Args:
        frame (ndarray): BGR image from OpenCV
        pose (mp.solutions.pose.Pose): Mediapipe Pose object

    Returns:
        frame (ndarray): Frame with overlays
        status (str or None): Movement status
        angle (float or None): Measured knee angle
        reps (int or None): Total repetition count
    """
    global squat_rep_count, squat_state

    try:
        landmarks, _ = get_pose_landmarks(frame, pose)
        if landmarks is None:
            print("🚫 No landmarks detected for squats.")
            return frame, None, None, None

        required_keys = ['LEFT_HIP', 'LEFT_KNEE', 'LEFT_ANKLE']
        if not all(key in landmarks for key in required_keys):
            print("🚫 Missing required landmarks for squats.")
            return frame, None, None, None

        hip = landmarks['LEFT_HIP']
        knee = landmarks['LEFT_KNEE']
        ankle = landmarks['LEFT_ANKLE']

        # Calculate the knee angle
        angle = calculate_angle(hip, knee, ankle)

        # Rep counting logic
        if angle < SQUAT_THRESHOLDS['down']:
            if squat_state == "up":
                squat_state = "down"
        elif angle > SQUAT_THRESHOLDS['up']:
            if squat_state == "down":
                squat_state = "up"
                squat_rep_count += 1

        # Status classification
        if angle < SQUAT_THRESHOLDS['down']:
            status = "Squatting Down"
        elif angle > SQUAT_THRESHOLDS['up']:
            status = "Standing Up"
        else:
            status = "In Between"

        # Overlay on frame
        cv2.putText(frame, f'Angle: {int(angle)}', (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, f'Status: {status}', (10, 70),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, f'Reps: {squat_rep_count}', (10, 110),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)

        return frame, status, int(angle), squat_rep_count

    except Exception as e:
        print(f"🔥 Error in process_frame_squats: {e}")
        return frame, None, None, None
