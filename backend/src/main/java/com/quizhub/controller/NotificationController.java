package com.quizhub.controller;

import com.quizhub.entity.Notification;
import com.quizhub.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{userId}")
    public List<Notification> getUserNotifications(@PathVariable Long userId) {
        return notificationService.getUserNotifications(userId);
    }

    @GetMapping("/{userId}/unread-count")
    public long getUnreadCount(@PathVariable Long userId) {
        return notificationService.getUnreadCount(userId);
    }

    @PutMapping("/{id}/read")
    public Notification markAsRead(@PathVariable Long id) {
        return notificationService.markAsRead(id);
    }
}
