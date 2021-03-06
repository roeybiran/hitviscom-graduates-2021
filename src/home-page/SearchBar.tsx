import debounce from '../lib/debounce';
import strings from '../lib/strings';
import { Center } from '@roeybiran/every-layout-styled-components';
import { FormEvent, useEffect, useMemo } from 'react';
import styled from 'styled-components';

type Props = {
	onInput: (s: string) => void;
};

export default function SearchBar(props: Props) {
	const debouncer = debounce();
	const handler = useMemo(
		() =>
			debouncer.schedule((e: FormEvent<HTMLInputElement>) => {
				props.onInput((e.target as HTMLInputElement).value);
			}),
		[props, debouncer]
	);
	useEffect(() => debouncer.clear(), [debouncer]);

	return (
		<Form onSubmit={(e) => e.preventDefault()}>
			<label className="sr-only" htmlFor="query-field">
				{strings.searchLabel}
			</label>
			<Center>
				<input
					type="text"
					id="query-field"
					onInput={handler}
					placeholder={strings.searchPlaceholder}
				/>
			</Center>
		</Form>
	);
}

const Form = styled.form`
	input {
		width: 100%;
		display: block;
		border-bottom: 2px solid var(--stdblue);
		outline: none;
		background-color: rgba(1, 1, 1, 0);
		appearance: none;
		color: var(--stdblue);
	}

	input:active,
	input:focus {
		border-bottom-style: dashed;
	}
`;
