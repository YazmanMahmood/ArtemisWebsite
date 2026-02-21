// src/data/products.js

export const outdoorResponseDrones = [
    {
        id: 1,
        name: 'Trainer Drone',
        image: '/images/prod1.jpg',
        category: 'Outdoor Response',
        type: 'Training System',
        description: 'Low-cost resilient training drone engineered for skill development, tactical simulation, and controlled pilot instruction.',
        specs: {
            flightTime: '20 mins',
            maxSpeed: '60–80 km/h',
            propulsion: 'Electric',
            protection: 'Full Propeller Guard',
            structure: 'Impact-Resistant'
        },
        features: [
            'FPV / Manual / Stabilized Assist',
            'Progressive Control Sensitivity',
            'Indoor/Outdoor Compatibility',
            'Modular Quick-Swap Components',
            'High Crash Survivability'
        ],
        tags: ['trainer', 'beginner', 'durable']
    },
    {
        id: 2,
        name: 'Artemis Freestyle Pro',
        image: '/images/prod2.jpg',
        category: 'Outdoor Response',
        type: 'FPV Freestyle',
        description: 'The ultimate cinematic freestyle platform — buttery-smooth flight, professional-grade imaging.',
        specs: {
            flightTime: '35 minutes',
            camera: '1080p / 2K',
            range: '5 km',
            maxSpeed: '95 km/h',
            frame: '6" Vibration-Damped',
        },
        features: [
            'Optional 3-axis gimbal',
            'AI Cinematic Modes',
            'Live color grading preview',
            'Dual battery hot-swap'
        ],
        tags: ['fpv', 'freestyle', 'cinematic', 'hd']
    },
    {
        id: 4,
        name: 'Artemis Scout',
        image: '/images/military.png',
        category: 'Outdoor Response',
        type: 'Drone-in-a-Box',
        description: 'Autonomous persistent surveillance and rapid-response deployment system.',
        specs: {
            flightTime: '45 mins',
            range: '30km',
            maxAltitude: '3000m',
            maxSpeed: '50 km/h',
            payload: 'Daylight / Thermal Camera'
        },
        features: [
            'Auto Docking & Launch',
            'Waypoint Navigation',
            'AI Anomaly Detection',
            'Vehicle/Person Track & Trace',
            'Optional Payload Dropper'
        ],
        tags: ['surveillance', 'monitoring', 'autonomous', 'scout']
    },
    {
        id: 5,
        name: 'Zulfikar D4',
        image: '/images/dropper drone.png',
        category: 'Outdoor Response',
        type: 'Payload Dropper',
        description: 'Autonomous aerial platform engineered for precision payload deployment in dynamic environments.',
        specs: {
            flightTime: '35 mins',
            payload: '4.5 kg',
            maxAltitude: '2000m',
            propulsion: 'Electric',
            deployment: 'Precision Release'
        },
        features: [
            'Real-Time AI Trajectory Modeling',
            'Wind Compensation',
            'Vision-Based Target Tracking',
            'Multi-Drone Sync Compatible',
            'Sequential Drop Support'
        ],
        tags: ['payload', 'delivery', 'heavy-lift', 'precision']
    },
    {
        id: 6,
        name: 'Nigran R3H',
        image: '/images/longrange2.png',
        category: 'Outdoor Response',
        type: 'VTOL ISR',
        description: 'Extended-range ISR platform combining VTOL flexibility with fixed-wing efficiency.',
        specs: {
            flightTime: '3 Hours',
            range: '30km',
            maxAltitude: '3000m',
            cruiseSpeed: '70-90 km/h',
            propulsion: 'Electric'
        },
        features: [
            'Auto Launch & Auto Land',
            'Waypoint Navigation',
            'AI Anomaly Detection',
            'Vehicle/Person Track & Trace',
            'Optional Laser Range Finder'
        ],
        tags: ['long-range', 'endurance', 'mapping', 'vtol']
    },
    {
        id: 10,
        name: 'Shahed',
        image: '/images/kamakaze.png',
        category: 'Outdoor Response',
        type: 'Long Range Strike',
        description: 'Long-range precision strike platform for high-value target engagement.',
        specs: {
            flightTime: '2.5 Hours',
            range: '250km',
            maxAltitude: '3000m',
            maxSpeed: '120 km/h',
            payload: '3 kg (Explosive)'
        },
        features: [
            'GPS Denied Navigation',
            'Smart Target Locking',
            'Autonomous Waypoint Navigation',
            'Daylight / Thermal Camera'
        ],
        tags: ['tactical', 'precision', 'long-range', 'strike']
    },
    {
        id: 12,
        name: 'Interceptor Drone',
        image: '/images/interceptor.jpeg',
        category: 'Outdoor Response',
        type: 'Defense',
        description: 'High-speed interceptor designed to neutralize unauthorized drones and secure airspace.',
        specs: {
            flightTime: '15 mins',
            maxSpeed: '180 km/h',
            range: '2 km',
            tracking: 'AI-powered target locking'
        },
        features: [
            'Ultra-high maneuverability',
            'AI-powered target locking',
            'Rapid ascent capability',
            'Propeller entanglement system'
        ],
        tags: ['defense', 'security', 'high-speed']
    },

];

export const publicSafetyDrones = [
    {
        id: 7,
        name: 'Public Announcement Drone',
        image: '/images/annoucement.png',
        category: 'Public Safety',
        type: 'PA System',
        description: 'Equipped with high-decibel speakers for clear communication in public areas.',
        specs: {
            flightTime: '30 min',
            audioRange: '1km',
            range: '5 km',
            maxSpeed: '45 km/h'
        },
        features: [
            'Ultra-loud siren/speaker',
            'Real-time voice transmission',
            'Integrated searchlight',
            'Dual-camera system'
        ],
        tags: ['pa', 'public-safety', 'emergency']
    },
    {
        id: 9,
        name: 'DFR (Drone as First Responder)',
        image: '/images/DFR.png',
        category: 'Public Safety',
        type: 'Emergency Response',
        description: 'Rapid deployment system for first response, providing live situational awareness.',
        specs: {
            flightTime: '35 min',
            camera: '4K HDR',
            range: '20 km',
            maxSpeed: '100 km/h'
        },
        features: [
            'Instant deployment dock',
            'Remote operator control',
            'Live streaming to HQ',
            'Weather-resistant design'
        ],
        tags: ['first-responder', 'emergency', 'dfr']
    }
];

export const allProductsData = [...outdoorResponseDrones, ...publicSafetyDrones];
