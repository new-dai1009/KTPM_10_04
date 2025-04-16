const axios = require('axios');
const axiosRetry = require('axios-retry');
const CircuitBreaker = require('circuit-breaker-js');
const rateLimit = require('express-rate-limit');

// Circuit Breaker
const breaker = new CircuitBreaker({
  windowDuration: 10000, // 10 giây
  numBuckets: 10,
  timeoutDuration: 5000, // Timeout 5 giây
  errorThreshold: 50, // 50% lỗi
  volumeThreshold: 10 // Cần ít nhất 10 yêu cầu
});

// Retry
axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  shouldResetTimeout: true
});

// Time Limiter (timeout được cấu hình trong CircuitBreaker)

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100 // Giới hạn 100 yêu cầu mỗi IP
});

class Proxy {
  static async forwardRequest(serviceUrl, method, endpoint, data = null) {
    return new Promise((resolve, reject) => {
      breaker.run(
        async () => {
          try {
            const url = `${serviceUrl}${endpoint}`;
            const response = await axios({
              method,
              url,
              data,
              timeout: 5000 // Time Limiter
            });
            resolve(response.data);
          } catch (err) {
            reject(new Error(err.response?.data?.error || err.message));
          }
        },
        () => reject(new Error('Circuit breaker is open'))
      );
    });
  }

  static getRateLimiter() {
    return limiter;
  }
}

module.exports = Proxy;