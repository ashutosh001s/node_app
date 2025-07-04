// Sample blog posts data
const posts = [
    {
        id: 1,
        title: "Getting Started with Unreal Engine 5 Lumen",
        excerpt: "Explore the revolutionary real-time global illumination system in UE5 and learn how to implement dynamic lighting in your games.",
        content: `
            <h2>Introduction to Lumen</h2>
            <p>Lumen is Unreal Engine 5's fully dynamic global illumination and reflections system that provides realistic lighting for large, detailed worlds. It eliminates the need for lightmap UVs, waiting for lightmaps to bake, or placing reflection captures.</p>
            
            <h2>Key Features</h2>
            <p>Lumen offers several groundbreaking features:</p>
            <ul>
                <li>Dynamic global illumination that reacts to direct lighting changes</li>
                <li>Infinite bounces of indirect lighting</li>
                <li>Reflections that can reflect objects not visible on screen</li>
                <li>Works with both static and dynamic geometry</li>
            </ul>
            
            <h2>Implementation Tips</h2>
            <p>To get the best results with Lumen:</p>
            <ol>
                <li>Enable Lumen in your project settings</li>
                <li>Use appropriate light sources with realistic intensities</li>
                <li>Optimize your scene for performance</li>
                <li>Test on various hardware configurations</li>
            </ol>
            
            <h2>Performance Considerations</h2>
            <p>While Lumen is powerful, it does come with performance costs. Consider using <code>r.Lumen.GlobalIllumination.MaxBounces</code> to control the number of light bounces and balance quality with performance.</p>
        `,
        category: "Unreal Engine",
        author: "CodeNPixel",
        date: "2024-01-15",
        image: "🎮"
    },
    {
        id: 2,
        title: "OpenGL Vertex Buffer Objects: A Deep Dive",
        excerpt: "Master the fundamentals of VBOs in OpenGL and learn how to efficiently manage vertex data for high-performance rendering.",
        content: `
            <h2>What are Vertex Buffer Objects?</h2>
            <p>Vertex Buffer Objects (VBOs) are OpenGL objects that store vertex data in GPU memory, providing a significant performance improvement over immediate mode rendering by reducing the number of function calls and data transfers.</p>
            
            <h2>Creating and Using VBOs</h2>
            <p>Here's a basic example of VBO usage:</p>
            <pre><code>// Generate buffer
unsigned int VBO;
glGenBuffers(1, &VBO);

// Bind buffer
glBindBuffer(GL_ARRAY_BUFFER, VBO);

// Upload data
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

// Set vertex attributes
glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
glEnableVertexAttribArray(0);</code></pre>
            
            <h2>Buffer Usage Patterns</h2>
            <p>Choose the right usage pattern for your data:</p>
            <ul>
                <li><code>GL_STATIC_DRAW</code> - Data modified once, used many times</li>
                <li><code>GL_DYNAMIC_DRAW</code> - Data modified repeatedly, used many times</li>
                <li><code>GL_STREAM_DRAW</code> - Data modified once, used a few times</li>
            </ul>
            
            <h2>Best Practices</h2>
            <p>To maximize VBO performance:</p>
            <ol>
                <li>Batch similar objects together</li>
                <li>Use appropriate buffer usage hints</li>
                <li>Minimize state changes</li>
                <li>Consider using Vertex Array Objects (VAOs) for cleaner code</li>
            </ol>
        `,
        category: "OpenGL",
        author: "CodeNPixel",
        date: "2024-01-10",
        image: "🔺"
    },
    {
        id: 3,
        title: "Building a Custom Game Engine: Architecture Decisions",
        excerpt: "Explore the key architectural decisions when building a game engine from scratch, including entity systems and rendering pipelines.",
        content: `
            <h2>Engine Architecture Overview</h2>
            <p>Building a game engine requires careful consideration of architecture patterns. The most common approaches include object-oriented hierarchies, component-based systems, and entity-component-system (ECS) architectures.</p>
            
            <h2>Entity-Component-System (ECS)</h2>
            <p>ECS is a popular pattern for game engines because it promotes:</p>
            <ul>
                <li>Data-oriented design</li>
                <li>Better cache performance</li>
                <li>Easier component reuse</li>
                <li>Cleaner code organization</li>
            </ul>
            
            <h2>Rendering Pipeline Design</h2>
            <p>A typical rendering pipeline consists of:</p>
            <ol>
                <li>Scene graph traversal</li>
                <li>Frustum culling</li>
                <li>Render queue sorting</li>
                <li>Batch rendering</li>
                <li>Post-processing effects</li>
            </ol>
            
            <h2>Memory Management</h2>
            <p>Efficient memory management is crucial for game engines. Consider implementing:</p>
            <ul>
                <li>Object pooling for frequently created/destroyed objects</li>
                <li>Custom allocators for specific use cases</li>
                <li>RAII patterns for resource management</li>
                <li>Memory debugging tools</li>
            </ul>
            
            <h3>Resource Management</h3>
            <p>Implement a robust resource management system that handles:</p>
            <pre><code>class ResourceManager {
    template<typename T>
    std::shared_ptr<T> Load(const std::string& path) {
        // Check cache first
        if (auto cached = GetFromCache<T>(path)) {
            return cached;
        }
        
        // Load and cache resource
        auto resource = std::make_shared<T>();
        resource->LoadFromFile(path);
        cache_[path] = resource;
        return resource;
    }
};</code></pre>
        `,
        category: "Game Development",
        author: "CodeNPixel",
        date: "2024-01-05",
        image: "⚙️"
    },
    {
        id: 4,
        title: "Implementing PBR Materials in Your Renderer",
        excerpt: "Learn how to implement physically-based rendering (PBR) materials for realistic lighting and material representation.",
        content: `
            <h2>Understanding PBR</h2>
            <p>Physically Based Rendering (PBR) is a rendering approach that aims to simulate light behavior in a physically accurate way. It uses energy conservation principles and real-world material properties to create more realistic renders.</p>
            
            <h2>Core PBR Components</h2>
            <p>A PBR material typically consists of:</p>
            <ul>
                <li><strong>Albedo</strong> - Base color of the material</li>
                <li><strong>Metallic</strong> - Whether the material is metallic or dielectric</li>
                <li><strong>Roughness</strong> - Surface roughness affecting reflections</li>
                <li><strong>Normal</strong> - Surface normal details</li>
                <li><strong>Ambient Occlusion</strong> - Self-shadowing information</li>
            </ul>
            
            <h2>BRDF Implementation</h2>
            <p>The Bidirectional Reflectance Distribution Function (BRDF) is at the heart of PBR. Here's a simplified implementation:</p>
            <pre><code>vec3 PBR_BRDF(vec3 albedo, float metallic, float roughness, 
              vec3 normal, vec3 viewDir, vec3 lightDir) {
    
    vec3 halfDir = normalize(lightDir + viewDir);
    float NdotL = max(dot(normal, lightDir), 0.0);
    float NdotV = max(dot(normal, viewDir), 0.0);
    float NdotH = max(dot(normal, halfDir), 0.0);
    
    // Fresnel term
    vec3 F0 = mix(vec3(0.04), albedo, metallic);
    vec3 F = fresnelSchlick(max(dot(halfDir, viewDir), 0.0), F0);
    
    // Distribution term
    float D = distributionGGX(NdotH, roughness);
    
    // Geometry term
    float G = geometrySmith(NdotL, NdotV, roughness);
    
    vec3 numerator = D * G * F;
    float denominator = 4.0 * NdotV * NdotL + 0.001;
    vec3 specular = numerator / denominator;
    
    vec3 kS = F;
    vec3 kD = vec3(1.0) - kS;
    kD *= 1.0 - metallic;
    
    return (kD * albedo / PI + specular) * NdotL;
}</code></pre>
            
            <h2>Texture Workflow</h2>
            <p>PBR textures follow specific conventions:</p>
            <ol>
                <li>Use linear color space for non-color data</li>
                <li>Pack textures efficiently (e.g., ORM maps)</li>
                <li>Follow consistent naming conventions</li>
                <li>Use appropriate bit depths for each channel</li>
            </ol>
        `,
        category: "Graphics Programming",
        author: "CodeNPixel",
        date: "2023-12-28",
        image: "✨"
    },
    {
        id: 5,
        title: "Optimizing Game Performance: Profiling and Debugging",
        excerpt: "Essential techniques for identifying and fixing performance bottlenecks in your games using modern profiling tools.",
        content: `
            <h2>Performance Profiling Fundamentals</h2>
            <p>Performance optimization starts with accurate measurement. Before optimizing anything, you need to identify where your bottlenecks actually are, not where you think they are.</p>
            
            <h2>CPU Profiling</h2>
            <p>Common CPU profiling tools include:</p>
            <ul>
                <li><strong>Visual Studio Profiler</strong> - Integrated with Visual Studio</li>
                <li><strong>Intel VTune</strong> - Advanced CPU analysis</li>
                <li><strong>Unreal Engine's Stat Commands</strong> - Built-in UE profiling</li>
                <li><strong>Custom Timer Classes</strong> - Lightweight profiling</li>
            </ul>
            
            <h2>GPU Profiling</h2>
            <p>GPU performance requires specialized tools:</p>
            <pre><code>// Example: Simple GPU timer
class GPUTimer {
    GLuint queries[2];
    
public:
    void Begin() {
        glGenQueries(2, queries);
        glQueryCounter(queries[0], GL_TIMESTAMP);
    }
    
    void End() {
        glQueryCounter(queries[1], GL_TIMESTAMP);
    }
    
    float GetTime() {
        GLuint64 start, end;
        glGetQueryObjectui64v(queries[0], GL_QUERY_RESULT, &start);
        glGetQueryObjectui64v(queries[1], GL_QUERY_RESULT, &end);
        return (end - start) / 1000000.0f; // Convert to milliseconds
    }
};</code></pre>
            
            <h2>Common Optimization Strategies</h2>
            <p>Once you've identified bottlenecks:</p>
            <ol>
                <li><strong>Batch Operations</strong> - Reduce API calls</li>
                <li><strong>LOD Systems</strong> - Use appropriate detail levels</li>
                <li><strong>Culling</strong> - Don't render what's not visible</li>
                <li><strong>Caching</strong> - Store expensive calculations</li>
                <li><strong>Multithreading</strong> - Parallelize independent work</li>
            </ol>
            
            <h2>Memory Optimization</h2>
            <p>Memory performance is often overlooked but crucial:</p>
            <ul>
                <li>Use structure of arrays (SoA) for better cache locality</li>
                <li>Implement object pooling for frequently allocated objects</li>
                <li>Profile memory usage patterns</li>
                <li>Consider custom memory allocators</li>
            </ul>
            
            <h3>Measuring Frame Time</h3>
            <p>Always measure frame time distribution, not just averages:</p>
            <pre><code>class FrameTimer {
    std::vector<float> frameTimes;
    
public:
    void RecordFrame(float deltaTime) {
        frameTimes.push_back(deltaTime);
        if (frameTimes.size() > 1000) {
            frameTimes.erase(frameTimes.begin());
        }
    }
    
    float GetPercentile(float percentile) {
        auto sorted = frameTimes;
        std::sort(sorted.begin(), sorted.end());
        size_t index = (size_t)(percentile * sorted.size());
        return sorted[index];
    }
};</code></pre>
        `,
        category: "Game Development",
        author: "CodeNPixel",
        date: "2023-12-20",
        image: "🚀"
    },
    {
        id: 6,
        title: "Ray Tracing Fundamentals: Theory to Implementation",
        excerpt: "Dive deep into ray tracing algorithms and learn how to implement a basic ray tracer from scratch.",
        content: `
            <h2>Ray Tracing Basics</h2>
            <p>Ray tracing is a rendering technique that simulates the physical behavior of light by tracing the path of rays through a scene. It can produce highly realistic images with accurate reflections, shadows, and global illumination.</p>
            
            <h2>Core Ray Tracing Algorithm</h2>
            <p>The basic ray tracing algorithm follows these steps:</p>
            <ol>
                <li>Cast rays from the camera through each pixel</li>
                <li>Find the closest intersection with scene geometry</li>
                <li>Calculate lighting at the intersection point</li>
                <li>Recursively trace reflection and refraction rays</li>
                <li>Combine all contributions to get the final color</li>
            </ol>
            
            <h2>Ray-Sphere Intersection</h2>
            <p>Here's a basic implementation of ray-sphere intersection:</p>
            <pre><code>struct Ray {
    vec3 origin;
    vec3 direction;
};

struct Sphere {
    vec3 center;
    float radius;
    vec3 color;
};

bool intersectSphere(const Ray& ray, const Sphere& sphere, float& t) {
    vec3 oc = ray.origin - sphere.center;
    float a = dot(ray.direction, ray.direction);
    float b = 2.0f * dot(oc, ray.direction);
    float c = dot(oc, oc) - sphere.radius * sphere.radius;
    
    float discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        return false;
    }
    
    float sqrtDisc = sqrt(discriminant);
    float t1 = (-b - sqrtDisc) / (2.0f * a);
    float t2 = (-b + sqrtDisc) / (2.0f * a);
    
    t = (t1 > 0) ? t1 : t2;
    return t > 0;
}</code></pre>
            
            <h2>Lighting Calculation</h2>
            <p>Once we have an intersection, we calculate the lighting using the Phong shading model:</p>
            <pre><code>vec3 calculateLighting(const vec3& point, const vec3& normal, 
                       const vec3& viewDir, const vec3& lightPos, 
                       const vec3& lightColor, const vec3& materialColor) {
    
    vec3 lightDir = normalize(lightPos - point);
    vec3 reflectDir = reflect(-lightDir, normal);
    
    // Ambient
    vec3 ambient = 0.1f * materialColor;
    
    // Diffuse
    float diff = max(dot(normal, lightDir), 0.0f);
    vec3 diffuse = diff * lightColor * materialColor;
    
    // Specular
    float spec = pow(max(dot(viewDir, reflectDir), 0.0f), 32);
    vec3 specular = spec * lightColor;
    
    return ambient + diffuse + specular;
}</code></pre>
            
            <h2>Recursive Ray Tracing</h2>
            <p>For reflections and refractions, we recursively trace additional rays:</p>
            <pre><code>vec3 traceRay(const Ray& ray, const Scene& scene, int depth) {
    if (depth <= 0) return vec3(0, 0, 0);
    
    float closestT = FLT_MAX;
    int closestObject = -1;
    
    // Find closest intersection
    for (int i = 0; i < scene.spheres.size(); i++) {
        float t;
        if (intersectSphere(ray, scene.spheres[i], t) && t < closestT) {
            closestT = t;
            closestObject = i;
        }
    }
    
    if (closestObject == -1) {
        return scene.backgroundColor;
    }
    
    // Calculate intersection point and normal
    vec3 point = ray.origin + closestT * ray.direction;
    vec3 normal = normalize(point - scene.spheres[closestObject].center);
    
    // Calculate direct lighting
    vec3 color = calculateLighting(point, normal, -ray.direction, 
                                 scene.lightPos, scene.lightColor, 
                                 scene.spheres[closestObject].color);
    
    // Trace reflection ray
    vec3 reflectDir = reflect(ray.direction, normal);
    Ray reflectRay = {point + 0.001f * normal, reflectDir};
    vec3 reflectColor = traceRay(reflectRay, scene, depth - 1);
    
    return color + 0.5f * reflectColor;
}</code></pre>
            
            <h2>Modern Ray Tracing</h2>
            <p>Modern ray tracing uses hardware acceleration and advanced techniques:</p>
            <ul>
                <li><strong>BVH (Bounding Volume Hierarchy)</strong> - Efficient intersection testing</li>
                <li><strong>Denoising</strong> - Reduce noise in low-sample renders</li>
                <li><strong>Importance Sampling</strong> - Better light sampling</li>
                <li><strong>GPU Acceleration</strong> - RT cores and compute shaders</li>
            </ul>
        `,
        category: "Graphics Programming",
        author: "CodeNPixel",
        date: "2023-12-15",
        image: "🌟"
    }
];

module.exports = posts;
