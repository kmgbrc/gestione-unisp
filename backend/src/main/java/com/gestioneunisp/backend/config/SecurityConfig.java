package com.gestioneunisp.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors() // Abilita il CORS
                .and()
                .csrf(csrf -> csrf.disable()) // Disabilita CSRF per test
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/membri/**").permitAll() // Accesso pubblico per /api/membri
                        .anyRequest().authenticated() // Richiede autenticazione per altre richieste
                )
                .httpBasic(); // Abilita HTTP Basic per test

        return http.build();
    }
}
