import { Spinner } from "react-bootstrap";

export const SpinnerCustom = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '98vw' }}>
            <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} />
        </div>
    );
}
