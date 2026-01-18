package com.backend.controller;

import com.backend.handler.APIResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
@CrossOrigin("*")
public class HealthController {

    @GetMapping("/ping")
    public ResponseEntity<Map<String, Object>> ping() {
        Map<String, String> data = new HashMap<>();
        data.put("status", "alive");
        data.put("timestamp", LocalDateTime.now().toString());
        data.put("service", "sudoku-backend");

        return APIResponse.builder()
                .responseStatus(HttpStatus.OK)
                .status("success")
                .message("Service is alive")
                .data(data)
                .build()
                .create();
    }
}
