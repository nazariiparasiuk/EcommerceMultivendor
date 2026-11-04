package com.store.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class JwtProviderTest {

    private static final String TEST_SECRET = "test-secret-for-unit-tests-only-at-least-32-bytes";

    private JwtProvider jwtProvider;

    @BeforeEach
    void setUp() {
        jwtProvider = new JwtProvider();
        ReflectionTestUtils.setField(jwtProvider, "jwtSecret", TEST_SECRET);
        ReflectionTestUtils.invokeMethod(jwtProvider, "init");
    }

    @ParameterizedTest
    @NullAndEmptySource
    @ValueSource(strings = {"abc", "Basic dXNlcjpwYXNz", "Bearer", "Bearer ", "Bearer    "})
    void extractBearerTokenReturnsNullForMalformedHeaders(String header) {
        assertThat(JwtProvider.extractBearerToken(header)).isNull();
    }

    @Test
    void extractBearerTokenReturnsTokenWithoutPrefix() {
        assertThat(JwtProvider.extractBearerToken("Bearer abc.def.ghi")).isEqualTo("abc.def.ghi");
    }

    @Test
    void getEmailFromJwtTokenAsksToSignInWhenTokenIsMissing() {
        assertThatThrownBy(() -> jwtProvider.getEmailFromJwtToken("Bearer "))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessage("Sign in to continue.");
    }

    @Test
    void getEmailFromJwtTokenRejectsInvalidToken() {
        assertThatThrownBy(() -> jwtProvider.getEmailFromJwtToken("Bearer null"))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessage("Your session has expired. Sign in again.");
    }

    @Test
    void getEmailFromJwtTokenReadsEmailFromValidToken() {
        var auth = new UsernamePasswordAuthenticationToken("anna@example.com", null,
                AuthorityUtils.createAuthorityList("ROLE_CUSTOMER"));
        String token = jwtProvider.generateToken(auth);

        assertThat(jwtProvider.getEmailFromJwtToken("Bearer " + token)).isEqualTo("anna@example.com");
    }
}