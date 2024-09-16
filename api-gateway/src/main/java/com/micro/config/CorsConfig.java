package com.micro.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

  @Value("${api.base.url:http://localhost:3000}")
  private String apiBaseUrl;

  @Bean
  public CorsWebFilter corsWebFilter() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    // Use allowedOriginPatterns instead of allowedOrigins
    corsConfiguration.addAllowedOriginPattern(apiBaseUrl);
    corsConfiguration.addAllowedMethod("*");
    corsConfiguration.addAllowedHeader("*");
    corsConfiguration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfiguration);

    return new CorsWebFilter(source);
  }
}
