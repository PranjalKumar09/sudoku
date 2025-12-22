package com.backend.service;

import com.backend.dto.HintResponse;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class SudokuSolverService {

    private final SudokuValidatorService validator;
    private final Random random = new Random();

    public SudokuSolverService(SudokuValidatorService validator) {
        this.validator = validator;
    }

    public boolean solve(int[][] board) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {

                if (board[row][col] == 0) {
                    for (int num : shuffledNumbers()) {
                        if (validator.isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve(board)) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    public int countSolutions(int[][] board, int limit) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {

                if (board[row][col] == 0) {
                    int count = 0;
                    for (int num : shuffledNumbers()) {
                        if (validator.isValid(board, row, col, num)) {
                            board[row][col] = num;
                            count += countSolutions(board, limit);
                            board[row][col] = 0;
                            if (count >= limit) return count;
                        }
                    }
                    return count;
                }
            }
        }
        return 1;
    }

    private int[] shuffledNumbers() {
        int[] nums = {1,2,3,4,5,6,7,8,9};
        for (int i = nums.length - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            int tmp = nums[i];
            nums[i] = nums[j];
            nums[j] = tmp;
        }
        return nums;
    }
}
