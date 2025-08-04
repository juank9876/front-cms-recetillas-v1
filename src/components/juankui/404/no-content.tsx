import React from 'react';

export default function NoContent() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center py-10">
            <h2 className="text-2xl font-bold mb-2">No Content Yet</h2>
            <p className="text-slate-600">There is no content available here yet. Please check back later!</p>
        </div>
    );
}
