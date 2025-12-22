package com.backend.service;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class SudokuGeneratorService {

    private final SudokuSolverService solver;
    private final Random random = new Random();

    public SudokuGeneratorService(SudokuSolverService solver) {
        this.solver = solver;
    }

    /* -------------------- FULL BOARD -------------------- */

    public int[][] generateFullBoard() {
        int[][] board = new int[9][9];
        fillDiagonalBoxes(board);
        solver.solve(board);
        return board;
    }

    public int[][] generateFullBoard(long seed) {
        random.setSeed(seed);
        return generateFullBoard();
    }

    /* -------------------- PUZZLE CREATION -------------------- */

    public int[][] createPuzzleFromSolution(int[][] solution, String difficulty) {
        int[][] puzzle = deepCopy(solution);
        int emptyCells = getEmptyCells(difficulty);
        removeCellsEnsuringUnique(puzzle, emptyCells);
        return puzzle;
    }

    /* -------------------- INTERNAL LOGIC -------------------- */

    private void fillDiagonalBoxes(int[][] board) {
        for (int i = 0; i < 9; i += 3) {
            fillBox(board, i, i);
        }
    }

    private void fillBox(int[][] board, int row, int col) {
        int[] nums = shuffledNumbers();
        int index = 0;

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                board[row + i][col + j] = nums[index++];
            }
        }
    }

    private void removeCellsEnsuringUnique(int[][] board, int emptyCells) {
        int attempts = emptyCells * 3;

        while (emptyCells > 0 && attempts-- > 0) {
            int row = random.nextInt(9);
            int col = random.nextInt(9);

            if (board[row][col] == 0) continue;

            int backup = board[row][col];
            board[row][col] = 0;

            int[][] copy = deepCopy(board);
            if (solver.countSolutions(copy, 2) != 1) {
                board[row][col] = backup;
            } else {
                emptyCells--;
            }
        }
    }

    private int getEmptyCells(String difficulty) {
        return switch (difficulty.toLowerCase()) {
            case "easy" -> 35;
            case "medium" -> 45;
            case "hard" -> 55;
            case "extreme" -> 60;
            default -> 40;
        };
    }

    private int[][] deepCopy(int[][] original) {
        int[][] copy = new int[9][9];
        for (int i = 0; i < 9; i++) {
            System.arraycopy(original[i], 0, copy[i], 0, 9);
        }
        return copy;
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


