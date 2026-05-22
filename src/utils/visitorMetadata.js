import FingerprintJS from '@fingerprintjs/fingerprintjs';

/**
 * Robust, secure, and centralized visitor metadata telemetry.
 * Automatically fetches the visitor's IP and geolocation details using
 * HTTPS-compliant, fast APIs with multiple secure fallbacks.
 * Generates an analytical device fingerprint using FingerprintJS.
 * Maps coordinates and labels exactly to original database schemas to guarantee full compatibility.
 * 
 * @returns {Promise<{
 *   IP: string,
 *   City: string,
 *   Region: string,
 *   Country: string,
 *   Latitude: number,
 *   Longitude: number,
 *   ISP: string,
 *   DeviceID: string,
 *   UserAgent: string,
 *   Language: string,
 *   Platform: string,
 *   ScreenResolution: string
 * }>}
 */
export async function getVisitorMetadata() {
  let visitorIP = 'unknown';
  let locationData = {
    City: 'unknown',
    Region: 'unknown',
    Country: 'unknown',
    Latitude: 0,
    Longitude: 0,
    ISP: 'unknown'
  };
  let deviceID = 'unknown';

  // 1. Capture IP and Geolocation under HTTPS
  try {
    // Primary HTTPS Geolocation API (freeipapi.com - robust and unlimited for low traffic)
    const res = await fetch('https://freeipapi.com/api/json');
    if (res.ok) {
      const data = await res.json();
      if (data && data.ipAddress) {
        visitorIP = data.ipAddress;
        locationData = {
          City: data.cityName || 'unknown',
          Region: data.regionName || 'unknown',
          Country: data.countryName || 'unknown',
          Latitude: data.latitude || 0,
          Longitude: data.longitude || 0,
          ISP: data.zipCode ? `ZIP: ${data.zipCode}` : 'unknown'
        };
      }
    } else {
      throw new Error(`Primary API response error: ${res.status}`);
    }
  } catch (e) {
    console.warn("Primary HTTPS Geolocation failed, attempting secondary secure fallback...", e);
    
    // Secondary Fallback Geolocation API (ipapi.co/json - reliable HTTPS fallback)
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
        if (data && data.ip) {
          visitorIP = data.ip;
          locationData = {
            City: data.city || 'unknown',
            Region: data.region || 'unknown',
            Country: data.country_name || 'unknown',
            Latitude: data.latitude || 0,
            Longitude: data.longitude || 0,
            ISP: data.org || 'unknown'
          };
        }
      } else {
        throw new Error(`Secondary API response error: ${res.status}`);
      }
    } catch (err) {
      console.error("Secondary HTTPS Geolocation fallback failed as well.", err);
    }
  }

  // 2. Teritary IP Fallback (In case all location APIs fail, at least grab the raw IP)
  if (visitorIP === 'unknown') {
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        visitorIP = ipData.ip;
      }
    } catch (e) {
      console.error("IP fallback fetch failed", e);
    }
  }

  // 3. Capture Device Fingerprint
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    deviceID = result.visitorId;
  } catch (e) {
    console.error("Fingerprint generation failed", e);
  }

  // 4. Return formatted visitor telemetry compatible with existing Realtime DB paths
  return {
    IP: visitorIP,
    ...locationData,
    DeviceID: deviceID,
    UserAgent: navigator.userAgent,
    Language: navigator.language,
    Platform: navigator.platform,
    ScreenResolution: `${window.screen.width}x${window.screen.height}`,
  };
}
