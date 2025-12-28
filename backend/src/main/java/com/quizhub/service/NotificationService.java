package com.quizhub.service;

import com.quizhub.entity.Notification;
import com.quizhub.entity.User;
import com.quizhub.repository.NotificationRepository;
import com.quizhub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    public void createNotification(Long userId, String message, String type, Long relatedId) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRelatedId(relatedId);
        notificationRepository.save(notification);
    }

    public void notifyAllAdmins(String message, String type, Long relatedId) {
        List<User> admins = userRepository.findByRole("ADMIN");
        System.out.println("Found " + admins.size() + " admins to notify."); // Debug Log
        for (User admin : admins) {
            Long adminId = admin.getId();
            if (adminId != null) {
                System.out.println("Notifying admin: " + admin.getUsername() + " (ID: " + adminId + ")"); // Debug Log
                createNotification(adminId, message, type, relatedId);
            }
        }
    }

    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public long getUnreadCount(Long userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    public Notification markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id).orElseThrow();
        notification.setRead(true);
        return notificationRepository.save(notification);
    }
}
