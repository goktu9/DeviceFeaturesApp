# Mobile Programming - React Native Lab 7
## Project: Device Features App (Camera, Location, Notifications)

This React Native application demonstrates accessing native device hardware using Expo APIs, built as part of the CMP437 Application Development On Android Devices 2025-2026 lab coursework.

**Key Features:**
* **Camera & Gallery:** Capture photos or pick images from the library using `expo-image-picker`.
* **GPS Location:** Retrieve current coordinates using `expo-location`.
* **Local Notifications:** Trigger system notifications upon successful location retrieval using `expo-notifications`.
* **Haptic Feedback:** Provide tactile feedback (vibration) during user interactions using `expo-haptics`.
* **Permissions:** Robust handling of system permissions for all hardware access.

---

### Student Information
**Name:** Göktuğ Varan **Student ID:** 210408029

---

### Prerequisites
* Node.js and npm installed.
* Expo Go app installed on your physical device (Recommended for testing hardware features).

---

### How to Run

1.  **Install Dependencies:**
    Navigate to the project folder and run:
    ```bash
    npm install
    ```

2.  **Start the App:**
    ```bash
    npx expo start
    ```

3.  **Test:**
    * Scan the QR code with the Expo Go app.
    * Navigate to "Camera & Gallery" to take or pick photos.
    * Navigate to "Location" to fetch GPS coordinates and receive a notification.