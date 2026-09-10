type IncidentDetailsProps = {
  employee: {
    name: string;
    username: string;
    department: string;
  };
  incidentType: string;
  attackMethod: string;
  authenticationTime: string;
  caseStatus: string;
};

export default function IncidentDetails({
  employee,
  incidentType,
  attackMethod,
  authenticationTime,
  caseStatus,
}: IncidentDetailsProps) {
  return (
    <div className="mt-8 border-t border-zinc-800 pt-6">
      <p className="text-xs text-zinc-600 tracking-widest">
        INCIDENT DETAILS
      </p>

      <div className="mt-4 grid grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-zinc-600">Affected User</p>
          <p className="text-zinc-300 mt-1">
            {employee.name} ({employee.username})
          </p>
        </div>

        <div>
          <p className="text-zinc-600">Department</p>
          <p className="text-zinc-300 mt-1">{employee.department}</p>
        </div>

        <div>
          <p className="text-zinc-600">Incident Type</p>
          <p className="text-zinc-300 mt-1">{incidentType}</p>
        </div>

        <div>
          <p className="text-zinc-600">Attack Method</p>
          <p className="text-zinc-300 mt-1">{attackMethod}</p>
        </div>

        <div>
          <p className="text-zinc-600">Authentication Time</p>
          <p className="text-zinc-300 mt-1">{authenticationTime}</p>
        </div>

        <div>
          <p className="text-zinc-600">Final Status</p>
          <p className="text-yellow-500 mt-1">{caseStatus}</p>
        </div>
      </div>
    </div>
  );
}
