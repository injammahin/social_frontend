import React, { useEffect, useRef, useState } from "react"
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    Camera,
    CheckCircle2,
    Eye,
    EyeClosed,
    FileText,
    IdCard,
    Loader2,
    Lock,
    Play,
    RefreshCcw,
    ShieldCheck,
    Sparkles,
    Square,
    Store,
    Upload,
    Video,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import { useMode } from "@/context/ModeContext"

const inputClass =
    "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1dbf73] focus:ring-4 focus:ring-[#1dbf73]/10"

const textareaClass =
    "min-h-[110px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1dbf73] focus:ring-4 focus:ring-[#1dbf73]/10"

const categories = [
    "Grocery",
    "Electronics",
    "Fashion",
    "Restaurant",
    "Pharmacy",
    "Beauty & Personal Care",
    "Home & Living",
    "Other",
]

const steps = [
    {
        title: "Shop Information",
        subtitle: "Basic seller profile",
        icon: Store,
    },
    {
        title: "NID Verification",
        subtitle: "Identity documents",
        icon: IdCard,
    },
    {
        title: "Face Verification",
        subtitle: "Live liveness check",
        icon: Camera,
    },
    {
        title: "Review & Submit",
        subtitle: "Final confirmation",
        icon: BadgeCheck,
    },
]

const livenessChecks = [
    {
        id: "look_up",
        title: "Look Up",
        instruction: "Look up slowly",
        helper: "Move your face upward while keeping it inside the circle.",
    },
    {
        id: "look_down",
        title: "Look Down",
        instruction: "Look down slowly",
        helper: "Move your face downward while keeping it inside the circle.",
    },
    {
        id: "blink",
        title: "Blink",
        instruction: "Blink your eyes",
        helper: "Blink once or twice while facing the camera.",
    },
    {
        id: "straight",
        title: "Look Straight",
        instruction: "Look straight",
        helper: "Look directly at the camera and keep your face centered.",
    },
]

function Field({ label, error, children }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-bold text-slate-800">
                {label}
            </label>

            {children}

            {error && (
                <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {error}
                </p>
            )}
        </div>
    )
}

function FileUploadBox({
    id,
    label,
    helper,
    file,
    previewUrl,
    error,
    onChange,
    accept = "image/*,.pdf",
    variant = "default",
}) {
    const isBanner = variant === "banner"
    const isLogo = variant === "logo"

    return (
        <div>
            <label
                htmlFor={id}
                className={`group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed bg-white text-center transition hover:border-[#1dbf73] hover:bg-[#1dbf73]/5 ${isBanner
                        ? "min-h-[240px]"
                        : isLogo
                            ? "min-h-[240px]"
                            : "min-h-[180px]"
                    } ${error
                        ? "border-red-300"
                        : file
                            ? "border-[#1dbf73]"
                            : "border-slate-200"
                    }`}
            >
                {previewUrl && (
                    <>
                        <img
                            src={previewUrl}
                            alt={label}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                    </>
                )}

                <div
                    className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ${previewUrl
                            ? "bg-white/90 text-[#119d5c]"
                            : "bg-[#1dbf73]/10 text-[#119d5c]"
                        }`}
                >
                    {file ? (
                        <CheckCircle2 className="h-7 w-7" />
                    ) : (
                        <Upload className="h-7 w-7" />
                    )}
                </div>

                <p
                    className={`relative z-10 mt-3 text-sm font-black ${previewUrl ? "text-white" : "text-slate-950"
                        }`}
                >
                    {label}
                </p>

                <p
                    className={`relative z-10 mt-1 max-w-[360px] px-4 text-xs leading-5 ${previewUrl ? "text-white/85" : "text-slate-500"
                        }`}
                >
                    {file ? file.name : helper || "Upload clear JPG, PNG, or PDF file"}
                </p>

                {previewUrl && (
                    <span className="relative z-10 mt-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#119d5c]">
                        Click to replace
                    </span>
                )}
            </label>

            <input
                id={id}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(event) => onChange(event.target.files?.[0] || null)}
            />

            {error && (
                <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {error}
                </p>
            )}
        </div>
    )
}

function getMediaRecorderOptions() {
    if (typeof MediaRecorder === "undefined") return undefined

    const types = [
        "video/webm;codecs=vp9,opus",
        "video/webm;codecs=vp8,opus",
        "video/webm",
    ]

    const supportedType = types.find((type) => MediaRecorder.isTypeSupported(type))

    return supportedType ? { mimeType: supportedType } : undefined
}

function maskNid(value) {
    const cleaned = String(value || "").replace(/\D/g, "")

    if (cleaned.length <= 4) return cleaned

    return `${"*".repeat(cleaned.length - 4)}${cleaned.slice(-4)}`
}

function distance(a, b) {
    if (!a || !b) return 0

    const dx = a.x - b.x
    const dy = a.y - b.y

    return Math.sqrt(dx * dx + dy * dy)
}

function getEyeAspectRatio(landmarks, side) {
    if (!landmarks?.length) return 1

    const left = {
        outer: landmarks[33],
        inner: landmarks[133],
        top1: landmarks[160],
        top2: landmarks[158],
        bottom1: landmarks[144],
        bottom2: landmarks[153],
    }

    const right = {
        outer: landmarks[362],
        inner: landmarks[263],
        top1: landmarks[385],
        top2: landmarks[387],
        bottom1: landmarks[380],
        bottom2: landmarks[373],
    }

    const eye = side === "left" ? left : right

    const vertical =
        distance(eye.top1, eye.bottom1) + distance(eye.top2, eye.bottom2)
    const horizontal = distance(eye.outer, eye.inner)

    if (!horizontal) return 1

    return vertical / (2 * horizontal)
}

function getBlendshapeScore(faceBlendshape, categoryName) {
    const category = faceBlendshape?.categories?.find(
        (item) => item.categoryName === categoryName
    )

    return category?.score || 0
}

function getFaceMetrics(landmarks, faceBlendshape) {
    if (!landmarks?.length) return null

    const nose = landmarks[1]
    const chin = landmarks[152]
    const forehead = landmarks[10]
    const leftCheek = landmarks[234]
    const rightCheek = landmarks[454]
    const leftEye = landmarks[33]
    const rightEye = landmarks[263]

    const faceCenterX = (leftCheek.x + rightCheek.x) / 2
    const faceCenterY = (forehead.y + chin.y) / 2
    const faceHeight = Math.max(0.001, chin.y - forehead.y)
    const faceWidth = Math.max(0.001, rightCheek.x - leftCheek.x)
    const eyeCenterY = (leftEye.y + rightEye.y) / 2

    const noseToEyeRatio = (nose.y - eyeCenterY) / faceHeight

    const leftEar = getEyeAspectRatio(landmarks, "left")
    const rightEar = getEyeAspectRatio(landmarks, "right")
    const blinkRatioByLandmarks = (leftEar + rightEar) / 2

    const blinkLeft = getBlendshapeScore(faceBlendshape, "eyeBlinkLeft")
    const blinkRight = getBlendshapeScore(faceBlendshape, "eyeBlinkRight")
    const blinkRatioByBlendshape = (blinkLeft + blinkRight) / 2

    return {
        noseY: nose.y,
        chinY: chin.y,
        foreheadY: forehead.y,
        faceCenterX,
        faceCenterY,
        faceHeight,
        faceWidth,
        noseToEyeRatio,
        blinkRatioByLandmarks,
        blinkRatioByBlendshape,
    }
}

function getDetectionLabel(checkId) {
    if (checkId === "look_up") return "Move your face upward"
    if (checkId === "look_down") return "Move your face downward"
    if (checkId === "blink") return "Blink your eyes now"

    return "Look directly at the camera"
}

export default function RegisterAsSellerPage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { sellerVerified, sellerApplication, completeSellerRegistration } =
        useMode()

    const videoRef = useRef(null)
    const streamRef = useRef(null)
    const recorderRef = useRef(null)
    const animationFrameRef = useRef(null)
    const previewUrlsRef = useRef([])
    const faceLandmarkerRef = useRef(null)

    const isRecordingRef = useRef(false)
    const baselineRef = useRef(null)
    const baselineFramesRef = useRef([])
    const currentStepRef = useRef(0)
    const completedStepsRef = useRef([])
    const blinkOpenRef = useRef(false)
    const straightFrameCountRef = useRef(0)
    const detectionCooldownRef = useRef(false)

    const [activeStep, setActiveStep] = useState(0)
    const [errors, setErrors] = useState({})
    const [cameraError, setCameraError] = useState("")
    const [streamReady, setStreamReady] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [isModelLoading, setIsModelLoading] = useState(false)
    const [faceDetected, setFaceDetected] = useState(false)
    const [currentLivenessIndex, setCurrentLivenessIndex] = useState(0)
    const [completedLivenessSteps, setCompletedLivenessSteps] = useState([])
    const [liveHint, setLiveHint] = useState("Start camera and center your face")
    const [calibrating, setCalibrating] = useState(false)

    const [form, setForm] = useState({
        shopName: "",
        ownerName: user?.fullName || "",
        phone: "",
        email: user?.email || "",
        category: "",
        address: "",

        shopLogo: null,
        shopLogoPreview: "",
        shopBanner: null,
        shopBannerPreview: "",

        nidNumber: "",
        nidFront: null,
        nidFrontPreview: "",
        nidBack: null,
        nidBackPreview: "",

        faceVideoBlob: null,
        faceVideoUrl: "",
        faceVerified: false,
    })

    const livenessProgress = Math.round(
        (completedLivenessSteps.length / livenessChecks.length) * 100
    )

    const currentCheck = livenessChecks[currentLivenessIndex]

    const stopCamera = () => {
        isRecordingRef.current = false

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop())
            streamRef.current = null
        }

        setStreamReady(false)

        if (videoRef.current) {
            videoRef.current.srcObject = null
        }
    }

    const stopRecording = () => {
        isRecordingRef.current = false

        if (
            recorderRef.current &&
            recorderRef.current.state &&
            recorderRef.current.state !== "inactive"
        ) {
            recorderRef.current.stop()
        }
    }

    useEffect(() => {
        if (sellerVerified && sellerApplication) {
            setForm((previous) => ({
                ...previous,
                shopName: sellerApplication?.shop?.shopName || previous.shopName,
                ownerName: sellerApplication?.shop?.ownerName || previous.ownerName,
                phone: sellerApplication?.shop?.phone || previous.phone,
                email: sellerApplication?.shop?.email || previous.email,
                category: sellerApplication?.shop?.category || previous.category,
                address: sellerApplication?.shop?.address || previous.address,
                nidNumber:
                    sellerApplication?.verification?.nidNumberMasked ||
                    previous.nidNumber,
            }))
        }
    }, [sellerVerified, sellerApplication])

    useEffect(() => {
        if (videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current
        }
    }, [streamReady])

    useEffect(() => {
        return () => {
            stopCamera()
            stopRecording()
            previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
        }
    }, [])

    const updateForm = (key, value) => {
        setForm((previous) => ({
            ...previous,
            [key]: value,
        }))

        setErrors((previous) => ({
            ...previous,
            [key]: "",
        }))
    }

    const updateFileWithPreview = (fileKey, previewKey, file) => {
        setForm((previous) => {
            if (previous[previewKey]) {
                URL.revokeObjectURL(previous[previewKey])
            }

            let previewUrl = ""

            if (file && file.type?.startsWith("image/")) {
                previewUrl = URL.createObjectURL(file)
                previewUrlsRef.current.push(previewUrl)
            }

            return {
                ...previous,
                [fileKey]: file,
                [previewKey]: previewUrl,
            }
        })

        setErrors((previous) => ({
            ...previous,
            [fileKey]: "",
        }))
    }

    const validateStep = () => {
        const nextErrors = {}

        if (activeStep === 0) {
            if (!form.shopName.trim()) nextErrors.shopName = "Shop name is required"
            if (!form.ownerName.trim()) nextErrors.ownerName = "Owner name is required"
            if (!form.phone.trim()) nextErrors.phone = "Phone number is required"
            if (!form.email.trim()) nextErrors.email = "Email address is required"
            if (!form.category) nextErrors.category = "Shop category is required"
            if (!form.address.trim()) nextErrors.address = "Shop address is required"
            if (!form.shopBanner) nextErrors.shopBanner = "Shop banner is required"
        }

        if (activeStep === 1) {
            const cleanNid = form.nidNumber.replace(/\D/g, "")

            if (!cleanNid) {
                nextErrors.nidNumber = "NID number is required"
            } else if (![10, 13, 17].includes(cleanNid.length)) {
                nextErrors.nidNumber =
                    "NID should be 10, 13, or 17 digits for Bangladesh"
            }

            if (!form.nidFront) nextErrors.nidFront = "NID front side is required"
            if (!form.nidBack) nextErrors.nidBack = "NID back side is required"
        }

        if (activeStep === 2) {
            if (!form.faceVerified || !form.faceVideoBlob) {
                nextErrors.faceVideo = "Please complete the face verification video"
            }
        }

        setErrors(nextErrors)

        return Object.keys(nextErrors).length === 0
    }

    const goNext = () => {
        if (!validateStep()) return

        setActiveStep((previous) => Math.min(previous + 1, steps.length - 1))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const goBack = () => {
        setActiveStep((previous) => Math.max(previous - 1, 0))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const loadFaceModel = async () => {
        if (faceLandmarkerRef.current) return faceLandmarkerRef.current

        setIsModelLoading(true)
        setCameraError("")

        try {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
            )

            const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
                    delegate: "CPU",
                },
                runningMode: "VIDEO",
                numFaces: 1,
                outputFaceBlendshapes: true,
            })

            faceLandmarkerRef.current = faceLandmarker

            return faceLandmarker
        } catch {
            setCameraError(
                "Face detection model could not load. Please check internet connection and try again."
            )

            return null
        } finally {
            setIsModelLoading(false)
        }
    }

    const resetLiveness = () => {
        currentStepRef.current = 0
        completedStepsRef.current = []
        baselineRef.current = null
        baselineFramesRef.current = []
        blinkOpenRef.current = false
        straightFrameCountRef.current = 0
        detectionCooldownRef.current = false

        setCurrentLivenessIndex(0)
        setCompletedLivenessSteps([])
        setFaceDetected(false)
        setCalibrating(true)
        setLiveHint("Hold still. Calibrating your face position.")
        setErrors((previous) => ({ ...previous, faceVideo: "" }))
    }

    const completeLivenessStep = (stepId) => {
        if (detectionCooldownRef.current) return
        if (completedStepsRef.current.includes(stepId)) return

        detectionCooldownRef.current = true

        const nextCompleted = [...completedStepsRef.current, stepId]
        completedStepsRef.current = nextCompleted

        setCompletedLivenessSteps(nextCompleted)

        setTimeout(() => {
            detectionCooldownRef.current = false

            if (currentStepRef.current < livenessChecks.length - 1) {
                currentStepRef.current += 1
                setCurrentLivenessIndex(currentStepRef.current)
                setLiveHint(getDetectionLabel(livenessChecks[currentStepRef.current].id))
                return
            }

            setForm((previous) => ({
                ...previous,
                faceVerified: true,
            }))

            setLiveHint("Verification completed successfully")

            setTimeout(() => {
                stopRecording()
            }, 500)
        }, 500)
    }

    const buildBaseline = (metrics) => {
        baselineFramesRef.current.push(metrics)

        if (baselineFramesRef.current.length < 10) {
            setCalibrating(true)
            setLiveHint("Hold still. Calibrating your face position.")
            return false
        }

        const frames = baselineFramesRef.current

        const average = (key) =>
            frames.reduce((sum, item) => sum + item[key], 0) / frames.length

        baselineRef.current = {
            noseY: average("noseY"),
            chinY: average("chinY"),
            foreheadY: average("foreheadY"),
            faceCenterX: average("faceCenterX"),
            faceCenterY: average("faceCenterY"),
            noseToEyeRatio: average("noseToEyeRatio"),
            blinkRatioByLandmarks: average("blinkRatioByLandmarks"),
            blinkRatioByBlendshape: average("blinkRatioByBlendshape"),
        }

        setCalibrating(false)
        setLiveHint(getDetectionLabel(livenessChecks[0].id))

        return true
    }

    const analyzeFrame = () => {
        const video = videoRef.current
        const faceLandmarker = faceLandmarkerRef.current

        if (!video || !faceLandmarker || !isRecordingRef.current) {
            return
        }

        if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
            const results = faceLandmarker.detectForVideo(video, performance.now())
            const landmarks = results?.faceLandmarks?.[0]
            const faceBlendshape = results?.faceBlendshapes?.[0]

            if (!landmarks) {
                setFaceDetected(false)
                setLiveHint("No face detected. Move closer and improve lighting.")
            } else {
                setFaceDetected(true)

                const metrics = getFaceMetrics(landmarks, faceBlendshape)

                if (metrics) {
                    if (!baselineRef.current) {
                        const baselineReady = buildBaseline(metrics)

                        if (!baselineReady) {
                            animationFrameRef.current = requestAnimationFrame(analyzeFrame)
                            return
                        }
                    }

                    const baseline = baselineRef.current
                    const activeCheck = livenessChecks[currentStepRef.current]

                    const threshold = 0.009
                    const straightThreshold = 0.018

                    const noseDelta = metrics.noseY - baseline.noseY
                    const chinDelta = metrics.chinY - baseline.chinY
                    const centerDelta = metrics.faceCenterY - baseline.faceCenterY
                    const ratioDelta =
                        metrics.noseToEyeRatio - baseline.noseToEyeRatio

                    const lookUpDetected =
                        noseDelta < -threshold ||
                        chinDelta < -threshold ||
                        centerDelta < -threshold ||
                        ratioDelta < -threshold

                    const lookDownDetected =
                        noseDelta > threshold ||
                        chinDelta > threshold ||
                        centerDelta > threshold ||
                        ratioDelta > threshold

                    if (
                        metrics.blinkRatioByLandmarks > 0.21 ||
                        metrics.blinkRatioByBlendshape < 0.15
                    ) {
                        blinkOpenRef.current = true
                    }

                    const blinkDetected =
                        metrics.blinkRatioByBlendshape > 0.35 ||
                        (blinkOpenRef.current && metrics.blinkRatioByLandmarks < 0.17)

                    const straightDetected =
                        Math.abs(noseDelta) < straightThreshold &&
                        Math.abs(chinDelta) < straightThreshold &&
                        Math.abs(centerDelta) < straightThreshold &&
                        Math.abs(ratioDelta) < straightThreshold

                    if (activeCheck?.id === "look_up") {
                        setLiveHint(
                            lookUpDetected ? "Look up detected" : "Move your face upward"
                        )

                        if (lookUpDetected) {
                            completeLivenessStep("look_up")
                        }
                    }

                    if (activeCheck?.id === "look_down") {
                        setLiveHint(
                            lookDownDetected
                                ? "Look down detected"
                                : "Move your face downward"
                        )

                        if (lookDownDetected) {
                            completeLivenessStep("look_down")
                        }
                    }

                    if (activeCheck?.id === "blink") {
                        setLiveHint(blinkDetected ? "Blink detected" : "Blink your eyes now")

                        if (blinkDetected) {
                            completeLivenessStep("blink")
                        }
                    }

                    if (activeCheck?.id === "straight") {
                        setLiveHint(
                            straightDetected ? "Hold straight..." : "Look straight at camera"
                        )

                        if (straightDetected) {
                            straightFrameCountRef.current += 1
                        } else {
                            straightFrameCountRef.current = 0
                        }

                        if (straightFrameCountRef.current >= 8) {
                            completeLivenessStep("straight")
                        }
                    }
                }
            }
        }

        animationFrameRef.current = requestAnimationFrame(analyzeFrame)
    }

    const startCamera = async () => {
        setCameraError("")

        if (!navigator.mediaDevices?.getUserMedia) {
            setCameraError("Camera is not supported in this browser.")
            return
        }

        const model = await loadFaceModel()

        if (!model) return

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    aspectRatio: { ideal: 1.7777777778 },
                    facingMode: "user",
                },
                audio: true,
            })

            streamRef.current = stream
            setStreamReady(true)
            setLiveHint("Camera ready. Start verification.")

            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        } catch {
            setCameraError(
                "Camera permission denied. Please allow camera permission and try again."
            )
        }
    }

    const startRecording = () => {
        setCameraError("")

        if (!streamRef.current) {
            setCameraError("Please start camera first.")
            return
        }

        if (typeof MediaRecorder === "undefined") {
            setCameraError("Video recording is not supported in this browser.")
            return
        }

        resetLiveness()

        const chunks = []
        const options = getMediaRecorderOptions()
        const recorder = new MediaRecorder(streamRef.current, options)

        recorderRef.current = recorder
        isRecordingRef.current = true

        setIsRecording(true)

        recorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                chunks.push(event.data)
            }
        }

        recorder.onstop = () => {
            isRecordingRef.current = false

            const passed = completedStepsRef.current.length === livenessChecks.length

            const blob = new Blob(chunks, {
                type: recorder.mimeType || "video/webm",
            })

            setForm((previous) => {
                if (previous.faceVideoUrl) {
                    URL.revokeObjectURL(previous.faceVideoUrl)
                }

                const videoUrl = URL.createObjectURL(blob)
                previewUrlsRef.current.push(videoUrl)

                return {
                    ...previous,
                    faceVideoBlob: passed ? blob : null,
                    faceVideoUrl: videoUrl,
                    faceVerified: passed,
                }
            })

            setIsRecording(false)
            stopCamera()

            if (passed) {
                setErrors((previous) => ({
                    ...previous,
                    faceVideo: "",
                }))
            } else {
                setErrors((previous) => ({
                    ...previous,
                    faceVideo:
                        "Verification stopped before all liveness steps were completed. Please retake.",
                }))
            }
        }

        recorder.start(250)

        setTimeout(() => {
            animationFrameRef.current = requestAnimationFrame(analyzeFrame)
        }, 350)
    }

    const retakeVideo = async () => {
        if (form.faceVideoUrl) {
            URL.revokeObjectURL(form.faceVideoUrl)
        }

        setForm((previous) => ({
            ...previous,
            faceVideoBlob: null,
            faceVideoUrl: "",
            faceVerified: false,
        }))

        resetLiveness()
        await startCamera()
    }

    const submitApplication = () => {
        if (!validateStep()) return

        const applicationPayload = {
            id:
                typeof crypto !== "undefined" && crypto.randomUUID
                    ? crypto.randomUUID()
                    : String(Date.now()),
            shop: {
                shopName: form.shopName.trim(),
                ownerName: form.ownerName.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
                category: form.category,
                address: form.address.trim(),
                shopLogoFileName: form.shopLogo?.name || "",
                shopBannerFileName: form.shopBanner?.name || "",
            },
            verification: {
                nidNumberMasked: maskNid(form.nidNumber),
                nidFrontFileName: form.nidFront?.name || "",
                nidBackFileName: form.nidBack?.name || "",
                faceVideoRecorded: Boolean(form.faceVideoBlob),
                livenessSteps: completedLivenessSteps,
            },
        }

        completeSellerRegistration(applicationPayload)
        navigate("/my-shop")
    }

    return (
        <div className="space-y-5">
            <Card className="overflow-hidden rounded-[32px] border-slate-200 bg-white shadow-sm">
                <CardContent className="p-0">
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#1dbf73]/15 via-white to-slate-50 p-6 sm:p-8">
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#1dbf73]/10 blur-3xl" />
                        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />

                        <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-[#1dbf73]/10 px-4 py-2 text-sm font-bold text-[#119d5c]">
                                    <ShieldCheck className="h-4 w-4" />
                                    Seller Verification
                                </div>

                                <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                    Register as a Seller
                                </h1>

                                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                                    Complete shop information, upload NID documents, preview your
                                    shop banner, and finish face verification to unlock seller
                                    mode.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-[#1dbf73]/20 bg-white/90 p-5 shadow-sm backdrop-blur">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                                    Current Status
                                </p>

                                <div className="mt-3 flex items-center gap-2">
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${sellerVerified ? "bg-[#1dbf73]" : "bg-amber-400"
                                            }`}
                                    />
                                    <p className="text-sm font-black text-slate-950">
                                        {sellerVerified ? "Verified Seller" : "Not Verified Yet"}
                                    </p>
                                </div>

                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-[#1dbf73] transition-all duration-500"
                                        style={{
                                            width: `${((activeStep + 1) / steps.length) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid border-t border-slate-100 sm:grid-cols-4">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            const isActive = activeStep === index
                            const isDone = activeStep > index

                            return (
                                <button
                                    key={step.title}
                                    type="button"
                                    onClick={() => {
                                        if (index <= activeStep) setActiveStep(index)
                                    }}
                                    className={`flex items-center gap-3 border-b border-slate-100 px-5 py-4 text-left transition sm:border-b-0 sm:border-r ${isActive
                                            ? "bg-[#1dbf73]/10"
                                            : isDone
                                                ? "bg-white"
                                                : "bg-slate-50/70"
                                        }`}
                                >
                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${isActive || isDone
                                                ? "bg-[#1dbf73] text-white"
                                                : "bg-white text-slate-400"
                                            }`}
                                    >
                                        {isDone ? (
                                            <CheckCircle2 className="h-5 w-5" />
                                        ) : (
                                            <Icon className="h-5 w-5" />
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <p
                                            className={`truncate text-sm font-black ${isActive ? "text-[#119d5c]" : "text-slate-900"
                                                }`}
                                        >
                                            {step.title}
                                        </p>
                                        <p className="truncate text-xs text-slate-500">
                                            {step.subtitle}
                                        </p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-[32px] border-slate-200 bg-white shadow-sm">
                <CardContent className="p-5 sm:p-7">
                    {activeStep === 0 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-black text-slate-950">
                                    Shop Information
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Add the main information that will be used for your seller
                                    profile.
                                </p>
                            </div>

                            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                                <FileUploadBox
                                    id="shop-banner"
                                    label="Upload Shop Banner"
                                    helper="Recommended size: 1200 x 400 px. This preview will show instantly after upload."
                                    file={form.shopBanner}
                                    previewUrl={form.shopBannerPreview}
                                    error={errors.shopBanner}
                                    accept="image/*"
                                    variant="banner"
                                    onChange={(file) =>
                                        updateFileWithPreview(
                                            "shopBanner",
                                            "shopBannerPreview",
                                            file
                                        )
                                    }
                                />

                                <FileUploadBox
                                    id="shop-logo"
                                    label="Upload Shop Logo"
                                    helper="Optional. Square logo looks best."
                                    file={form.shopLogo}
                                    previewUrl={form.shopLogoPreview}
                                    accept="image/*"
                                    variant="logo"
                                    onChange={(file) =>
                                        updateFileWithPreview("shopLogo", "shopLogoPreview", file)
                                    }
                                />
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <Field label="Shop Name" error={errors.shopName}>
                                    <input
                                        className={inputClass}
                                        value={form.shopName}
                                        onChange={(event) =>
                                            updateForm("shopName", event.target.value)
                                        }
                                        placeholder="Example: Green Valley Mart"
                                    />
                                </Field>

                                <Field label="Owner Name" error={errors.ownerName}>
                                    <input
                                        className={inputClass}
                                        value={form.ownerName}
                                        onChange={(event) =>
                                            updateForm("ownerName", event.target.value)
                                        }
                                        placeholder="Owner full name"
                                    />
                                </Field>

                                <Field label="Phone Number" error={errors.phone}>
                                    <input
                                        className={inputClass}
                                        value={form.phone}
                                        onChange={(event) => updateForm("phone", event.target.value)}
                                        placeholder="Example: 01XXXXXXXXX"
                                    />
                                </Field>

                                <Field label="Email Address" error={errors.email}>
                                    <input
                                        className={inputClass}
                                        value={form.email}
                                        onChange={(event) => updateForm("email", event.target.value)}
                                        placeholder="seller@example.com"
                                    />
                                </Field>

                                <Field label="Shop Category" error={errors.category}>
                                    <select
                                        className={inputClass}
                                        value={form.category}
                                        onChange={(event) =>
                                            updateForm("category", event.target.value)
                                        }
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                <Field label="Shop Address" error={errors.address}>
                                    <textarea
                                        className={textareaClass}
                                        value={form.address}
                                        onChange={(event) =>
                                            updateForm("address", event.target.value)
                                        }
                                        placeholder="Write your full shop address"
                                    />
                                </Field>
                            </div>
                        </div>
                    )}

                    {activeStep === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-black text-slate-950">
                                    NID Verification
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Upload both sides of your NID. After upload, image previews
                                    will be visible immediately.
                                </p>
                            </div>

                            <Field label="NID Number" error={errors.nidNumber}>
                                <input
                                    className={inputClass}
                                    value={form.nidNumber}
                                    onChange={(event) =>
                                        updateForm("nidNumber", event.target.value)
                                    }
                                    placeholder="Enter 10, 13, or 17 digit NID number"
                                />
                            </Field>

                            <div className="grid gap-5 md:grid-cols-2">
                                <FileUploadBox
                                    id="nid-front"
                                    label="Upload NID Front Side"
                                    helper="Upload clear JPG, PNG, or PDF file"
                                    file={form.nidFront}
                                    previewUrl={form.nidFrontPreview}
                                    error={errors.nidFront}
                                    onChange={(file) =>
                                        updateFileWithPreview("nidFront", "nidFrontPreview", file)
                                    }
                                />

                                <FileUploadBox
                                    id="nid-back"
                                    label="Upload NID Back Side"
                                    helper="Upload clear JPG, PNG, or PDF file"
                                    file={form.nidBack}
                                    previewUrl={form.nidBackPreview}
                                    error={errors.nidBack}
                                    onChange={(file) =>
                                        updateFileWithPreview("nidBack", "nidBackPreview", file)
                                    }
                                />
                            </div>
                        </div>
                    )}

                    {activeStep === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-black text-slate-950">
                                    Face Verification
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Keep your face inside the circle. The circle turns green as
                                    each live movement is detected.
                                </p>
                            </div>

                            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
                                <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950 shadow-sm">
                                    {form.faceVideoUrl ? (
                                        <video
                                            src={form.faceVideoUrl}
                                            controls
                                            className="aspect-video w-full bg-slate-950 object-cover"
                                        />
                                    ) : (
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            muted
                                            playsInline
                                            className="aspect-video w-full bg-slate-950 object-cover"
                                        />
                                    )}

                                    {!form.faceVideoUrl && (
                                        <div className="pointer-events-none absolute inset-0">
                                            <div
                                                className="absolute left-1/2 top-1/2 aspect-square h-[52%] min-h-[210px] max-h-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
                                                style={{
                                                    background: `conic-gradient(#22c55e ${livenessProgress}%, #ef4444 ${livenessProgress}% 100%)`,
                                                    WebkitMask:
                                                        "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)",
                                                    mask: "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)",
                                                }}
                                            />

                                            <div className="absolute right-5 top-5 rounded-2xl bg-white/90 px-4 py-3 text-right shadow-xl backdrop-blur">
                                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                                                    Progress
                                                </p>
                                                <p className="text-xl font-black text-slate-950">
                                                    {livenessProgress}%
                                                </p>
                                            </div>

                                            <div
                                                className={`absolute left-5 top-5 flex items-center gap-2 rounded-2xl px-4 py-3 shadow-xl backdrop-blur ${faceDetected
                                                        ? "bg-[#1dbf73]/90 text-white"
                                                        : "bg-red-500/90 text-white"
                                                    }`}
                                            >
                                                {faceDetected ? (
                                                    <Eye className="h-4 w-4" />
                                                ) : (
                                                    <EyeClosed className="h-4 w-4" />
                                                )}

                                                <span className="text-sm font-black">
                                                    {faceDetected ? "Face detected" : "No face"}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1dbf73]/10 text-[#119d5c]">
                                            <Video className="h-7 w-7" />
                                        </div>

                                        <div className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
                                            {completedLivenessSteps.length}/4 done
                                        </div>
                                    </div>

                                    <h3 className="mt-5 text-lg font-black text-slate-950">
                                        Current Instruction
                                    </h3>

                                    <div className="mt-3 rounded-3xl bg-white p-5 text-center shadow-sm">
                                        <p className="text-xl font-black text-[#119d5c]">
                                            {calibrating ? "Hold still" : currentCheck.instruction}
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            {calibrating
                                                ? "We are reading your normal face position."
                                                : currentCheck.helper}
                                        </p>

                                        <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                                            {liveHint}
                                        </div>
                                    </div>

                                    <div className="mt-5 grid grid-cols-4 gap-2">
                                        {livenessChecks.map((check, index) => {
                                            const isDone = completedLivenessSteps.includes(check.id)
                                            const isActive =
                                                currentLivenessIndex === index && isRecording
                                            const isLocked =
                                                !isDone && !isActive && index > currentLivenessIndex

                                            return (
                                                <div
                                                    key={check.id}
                                                    className={`rounded-2xl border p-3 text-center transition ${isDone
                                                            ? "border-[#1dbf73]/30 bg-[#1dbf73]/10 text-[#119d5c]"
                                                            : isActive
                                                                ? "border-red-200 bg-red-50 text-red-600"
                                                                : "border-slate-200 bg-white text-slate-400"
                                                        }`}
                                                >
                                                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                                                        {isDone ? (
                                                            <CheckCircle2 className="h-5 w-5" />
                                                        ) : isLocked ? (
                                                            <Lock className="h-4 w-4" />
                                                        ) : (
                                                            <span className="text-sm font-black">
                                                                {index + 1}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="mt-2 text-xs font-black">
                                                        {isDone
                                                            ? "Done"
                                                            : isActive
                                                                ? "Now"
                                                                : "Locked"}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className="h-full rounded-full bg-[#22c55e] transition-all duration-500"
                                            style={{ width: `${livenessProgress}%` }}
                                        />
                                    </div>

                                    <div className="mt-5 space-y-3">
                                        {!streamReady && !form.faceVideoUrl && (
                                            <Button
                                                type="button"
                                                onClick={startCamera}
                                                disabled={isModelLoading}
                                                className="h-12 w-full rounded-2xl bg-[#1dbf73] font-bold text-white hover:bg-[#19a965]"
                                            >
                                                {isModelLoading ? (
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Camera className="mr-2 h-4 w-4" />
                                                )}
                                                {isModelLoading ? "Loading Face AI..." : "Start Camera"}
                                            </Button>
                                        )}

                                        {streamReady && !isRecording && !form.faceVideoUrl && (
                                            <Button
                                                type="button"
                                                onClick={startRecording}
                                                className="h-12 w-full rounded-2xl bg-[#1dbf73] font-bold text-white hover:bg-[#19a965]"
                                            >
                                                <Play className="mr-2 h-4 w-4" />
                                                Start Verification
                                            </Button>
                                        )}

                                        {isRecording && (
                                            <Button
                                                type="button"
                                                onClick={stopRecording}
                                                className="h-12 w-full rounded-2xl bg-red-600 font-bold text-white hover:bg-red-700"
                                            >
                                                <Square className="mr-2 h-4 w-4" />
                                                Stop Recording
                                            </Button>
                                        )}

                                        {form.faceVideoUrl && (
                                            <Button
                                                type="button"
                                                onClick={retakeVideo}
                                                variant="outline"
                                                className="h-12 w-full rounded-2xl border-slate-200 font-bold"
                                            >
                                                <RefreshCcw className="mr-2 h-4 w-4" />
                                                Retake Video
                                            </Button>
                                        )}
                                    </div>

                                    {form.faceVerified && (
                                        <div className="mt-4 rounded-2xl bg-[#1dbf73]/10 p-3 text-sm font-bold text-[#119d5c]">
                                            <CheckCircle2 className="mr-2 inline h-4 w-4" />
                                            Face verification completed successfully
                                        </div>
                                    )}

                                    {(cameraError || errors.faceVideo) && (
                                        <div className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-600">
                                            {cameraError || errors.faceVideo}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeStep === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-black text-slate-950">
                                    Review & Submit
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Check all submitted information before completing seller
                                    registration.
                                </p>
                            </div>

                            {form.shopBannerPreview && (
                                <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100">
                                    <img
                                        src={form.shopBannerPreview}
                                        alt="Shop banner preview"
                                        className="h-56 w-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="grid gap-5 lg:grid-cols-2">
                                <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-5">
                                    <div className="flex items-center gap-3">
                                        <Store className="h-5 w-5 text-[#119d5c]" />
                                        <h3 className="font-black text-slate-950">
                                            Shop Details
                                        </h3>
                                    </div>

                                    <div className="mt-4 space-y-3 text-sm">
                                        <ReviewRow label="Shop Name" value={form.shopName} />
                                        <ReviewRow label="Owner" value={form.ownerName} />
                                        <ReviewRow label="Phone" value={form.phone} />
                                        <ReviewRow label="Email" value={form.email} />
                                        <ReviewRow label="Category" value={form.category} />
                                        <ReviewRow label="Address" value={form.address} />
                                        <ReviewRow
                                            label="Banner"
                                            value={form.shopBanner?.name || "Not uploaded"}
                                        />
                                        <ReviewRow
                                            label="Logo"
                                            value={form.shopLogo?.name || "Not uploaded"}
                                        />
                                    </div>
                                </div>

                                <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-5">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-[#119d5c]" />
                                        <h3 className="font-black text-slate-950">
                                            Verification Details
                                        </h3>
                                    </div>

                                    <div className="mt-4 space-y-3 text-sm">
                                        <ReviewRow
                                            label="NID Number"
                                            value={maskNid(form.nidNumber)}
                                        />
                                        <ReviewRow
                                            label="NID Front"
                                            value={form.nidFront?.name || "Not uploaded"}
                                        />
                                        <ReviewRow
                                            label="NID Back"
                                            value={form.nidBack?.name || "Not uploaded"}
                                        />
                                        <ReviewRow
                                            label="Face Video"
                                            value={
                                                form.faceVerified
                                                    ? "Recorded and verified"
                                                    : "Not verified"
                                            }
                                        />
                                        <ReviewRow
                                            label="Liveness"
                                            value={`${completedLivenessSteps.length}/4 steps completed`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[32px] border border-[#1dbf73]/20 bg-[#1dbf73]/10 p-5">
                                <div className="flex gap-3">
                                    <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#119d5c]" />
                                    <div>
                                        <h3 className="font-black text-slate-950">
                                            Seller account will be verified now
                                        </h3>
                                        <p className="mt-1 text-sm leading-6 text-slate-600">
                                            After submission, this frontend version will mark the user
                                            as a verified seller and unlock the buyer/seller toggle.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={goBack}
                            disabled={activeStep === 0}
                            className="h-12 rounded-2xl border-slate-200 px-6 font-bold disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>

                        {activeStep < steps.length - 1 ? (
                            <Button
                                type="button"
                                onClick={goNext}
                                className="h-12 rounded-2xl bg-[#1dbf73] px-6 font-bold text-white hover:bg-[#19a965]"
                            >
                                Continue
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={submitApplication}
                                className="h-12 rounded-2xl bg-[#1dbf73] px-6 font-bold text-white hover:bg-[#19a965]"
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Submit & Verify Seller
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function ReviewRow({ label, value }) {
    return (
        <div className="flex gap-4 rounded-2xl bg-white px-4 py-3">
            <p className="w-28 shrink-0 text-xs font-bold uppercase tracking-wide text-slate-400">
                {label}
            </p>
            <p className="min-w-0 flex-1 break-words text-sm font-bold text-slate-900">
                {value || "Not provided"}
            </p>
        </div>
    )
}