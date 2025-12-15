package com.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Map;

@Configuration
public class SwaggerConfig {

    /* -------------------- OPENAPI INFO -------------------- */

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Sudoku Game API")
                        .description("Backend APIs for Sudoku game (generate, validate, solve puzzles)")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Pranjla Kumar Shukla")
                                .email("coderkumarshukla@gmail.com")
                                .url("https://github.com/pranjalkumar09")
                        )
                        .license(new License()
                                .name("MIT License")
                        )
                )
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Local Development Server")
                ));
    }

    /* -------------------- GROUPED API -------------------- */

    @Bean
    public GroupedOpenApi sudokuApi() {
        return GroupedOpenApi.builder()
                .group("sudoku-api")
                .packagesToScan("com.backend")
                .addOperationCustomizer(apiResponseWrapper())
                .build();
    }

    /* -------------------- GLOBAL RESPONSE FORMAT -------------------- */

    @Bean
    public OperationCustomizer apiResponseWrapper() {
        return (operation, handlerMethod) -> {

            ApiResponse okResponse = new ApiResponse()
                    .description("Successful response")
                    .content(apiResponseSchema(true));

            ApiResponse badRequest = new ApiResponse()
                    .description("Bad Request")
                    .content(apiResponseSchema(false));

            ApiResponse serverError = new ApiResponse()
                    .description("Internal Server Error")
                    .content(apiResponseSchema(false));

            operation.getResponses().addApiResponse("200", okResponse);
            operation.getResponses().addApiResponse("400", badRequest);
            operation.getResponses().addApiResponse("500", serverError);

            return operation;
        };
    }

    private Content apiResponseSchema(boolean success) {
        return new Content().addMediaType(
                "application/json",
                new MediaType().schema(
                        new Schema<Map<String, Object>>()
                                .example(Map.of(
                                        "success", success,
                                        "message", success ? "Operation successful" : "Invalid Sudoku input",
                                        "data", success ? "Any response object" : null,
                                        "timestamp", "2025-01-01T12:00:00"
                                ))
                )
        );
    }
}
