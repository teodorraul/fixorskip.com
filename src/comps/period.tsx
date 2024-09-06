import { useCallback, useEffect, useState } from "react";
import { useClickHandler } from "src/hooks/useClickHandler";
import { useDispatch } from "src/state/state";
import {
	OftenButton,
	OftenRow,
	PeriodRow,
	Row,
	Section,
} from "./stylesheet.css";

export const Period = () => {
	const [period, setPeriod] = useState<
		"daily" | "weekly" | "monthly" | "yearly"
	>("weekly");
	const [times, setTimes] = useState(5);

	const handleSelection = useClickHandler(
		"period",
		(value, e) => {
			setPeriod(value as any);
		},
		[]
	);

	const handleTimesChange = useCallback((e) => {
		const elem = e?.target || e.currentTarget;
		setTimes(elem.value);
	}, []);

	const dispatch = useDispatch();

	useEffect(() => {
		let totalTimes = 0;

		switch (period) {
			case "daily":
				totalTimes = times * 365;
				break;
			case "weekly":
				totalTimes = times * (365 / 7);
				break;
			case "monthly":
				totalTimes = times * 12;
				break;
			case "yearly":
				totalTimes = times;
				break;
		}

		dispatch({
			type: "SET_RECURRENCE",
			payload: {
				tasksPerYear: totalTimes,
			},
		});
	}, [times, period]);

	return (
		<div className={Section}>
			<p>How often do you perform this task?</p>
			<div className={Row}>
				<input type="number" value={times} onChange={handleTimesChange} />
				<span>times</span>
			</div>
			<div className={OftenRow}>
				<button
					onClick={handleSelection}
					className={OftenButton({
						active: period == "daily",
					})}
					data-period="daily"
				>
					/ day
				</button>
				<button
					onClick={handleSelection}
					className={OftenButton({
						active: period == "weekly",
					})}
					data-period="weekly"
				>
					/ week
				</button>
				<button
					onClick={handleSelection}
					className={OftenButton({
						active: period == "monthly",
					})}
					data-period="monthly"
				>
					/ month
				</button>
				<button
					onClick={handleSelection}
					className={OftenButton({
						active: period == "yearly",
					})}
					data-period="yearly"
				>
					/ year
				</button>
			</div>
		</div>
	);
};
