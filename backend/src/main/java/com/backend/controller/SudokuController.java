package com.backend.controller;

import com.backend.handler.APIResponse;
import com.backend.service.SudokuGeneratorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/sudoku")
@CrossOrigin("*")
public class SudokuController {

    private final SudokuGeneratorService generator;

    public SudokuController(SudokuGeneratorService generator) {
        this.generator = generator;
    }

    private static final String[] DIFFICULTIES = {
            "easy", "medium", "hard", "extreme"
    };

    /* -------------------- GENERATE -------------------- */

    @GetMapping("/generate")
    public ResponseEntity<Map<String, Object>> generate(
            @RequestParam(defaultValue = "easy") String difficulty) {

        int[][] solution = generator.generateFullBoard();
        int[][] puzzle = generator.createPuzzleFromSolution(solution, difficulty);

        Map<String, int[][]> data = new HashMap<>();
        data.put("puzzle", puzzle);
        data.put("solution", solution);

        return APIResponse.builder()
                .responseStatus(HttpStatus.OK)
                .status("success")
                .message("Sudoku generated successfully")
                .data(data)
                .build()
                .create();
    }

    /* -------------------- DAILY -------------------- */

    @GetMapping("/daily")
    public ResponseEntity<Map<String, Object>> daily(
            @RequestParam(required = false) String date
    ) {
        LocalDate targetDate = (date == null)
                ? LocalDate.now()
                : LocalDate.parse(date);

        long seed = targetDate.toEpochDay();

        String difficulty = getDailyDifficulty(seed);

        int[][] solution = generator.generateFullBoard(seed);
        int[][] puzzle = generator.createPuzzleFromSolution(solution, difficulty);

        Map<String, int[][]> data = new HashMap<>();
        data.put("puzzle", puzzle);
        data.put("solution", solution);

        return APIResponse.builder()
                .responseStatus(HttpStatus.OK)
                .status("success")
                .message("Daily Sudoku generated")
                .data(data)
                .build()
                .create();
    }

    private String getDailyDifficulty(long seed) {
        Random random = new Random(seed);
        int index = random.nextInt(DIFFICULTIES.length);
        return DIFFICULTIES[index];
    }


}

