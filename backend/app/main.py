from fastapi import FastAPI

app = FastAPI(
    title="INCIDENT 0042",
    description="Cyber Incident Response Simulator",
    version="0.1.0"
)


@app.get("/")
def home():
    return {
        "application": "INCIDENT 0042",
        "version": "0.1.0",
        "status": "ONLINE",
        "message": "Welcome to the Cyber Incident Response Simulator"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/incident/0042")
def incident_0042():
    return {
        "id": "0042-001",
        "title": "Suspicious Employee Login",
        "severity": "HIGH",
        "status": "UNASSIGNED",
        "employee": {
            "name": "Jordan Smith",
            "username": "jsmith",
            "department": "Finance"
        },
        "alert": {
            "time": "03:22",
            "type": "Suspicious Authentication",
            "description": (
                "Successful authentication occurred "
                "after multiple failed login attempts."
            )
        },
        "events": [
            {"time": "03:14", "event": "FAILED_LOGIN"},
            {"time": "03:15", "event": "FAILED_LOGIN"},
            {"time": "03:17", "event": "FAILED_LOGIN"},
            {"time": "03:18", "event": "MFA_DENIED"},
            {"time": "03:20", "event": "MFA_DENIED"},
            {"time": "03:22", "event": "MFA_ACCEPTED"},
            {"time": "03:22", "event": "LOGIN_SUCCESSFUL"}
        ],
        "source_ip": "185.234.XXX.XXX",
        "instructions": (
            "Investigate the authentication event and determine "
            "whether the employee account has been compromised."
        )
    }
