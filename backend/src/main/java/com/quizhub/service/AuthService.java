package com.quizhub.service;

import com.quizhub.dto.AuthResponse;
import com.quizhub.dto.LoginRequest;
import com.quizhub.dto.RegisterRequest;
import com.quizhub.entity.User;
import com.quizhub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(encodePassword(request.getPassword()));
        user.setRole(request.getRole());

        User savedUser = userRepository.save(user);

        return new AuthResponse(savedUser.getId(), savedUser.getUsername(), savedUser.getRole(), generateToken());
    }

    public AuthResponse login(LoginRequest request) {
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());

        if (userOptional.isEmpty() || !verifyPassword(request.getPassword(), userOptional.get().getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        User user = userOptional.get();
        return new AuthResponse(user.getId(), user.getUsername(), user.getRole(), generateToken());
    }

    public java.util.List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Simple Base64 encoding for demo purposes. Use BCrypt in production.
    private String encodePassword(String password) {
        return Base64.getEncoder().encodeToString(password.getBytes());
    }

    private boolean verifyPassword(String rawPassword, String encodedPassword) {
        return encodePassword(rawPassword).equals(encodedPassword);
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }
}
